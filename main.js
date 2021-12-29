import { post } from 'request';
import reddit from '/redditapi';

const searchForm = document.getElementById('search-container');
const searchInput = document.getElementById('search-input');

//When search button is clicked
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    //Get all values of inut from user and store in varibale
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    const limit = document.querySelector('#limit').value;
    const searchTerm = searchInput.value;
    
    //If search is blank
    if(searchTerm === '') {
        showMessage('Please add a search keyword', 'alert-danger');
    }
    //Clear search field
    searchInput.value = '';

    //Search on reddit
    reddit.search(searchTerm, limit, sortBy).then(results => {
        console.log(results);
        let output = `<div class="card-columns">`;
        results.forEach(post => {
            let image = post.preview? post.preview.images[0].source.url : 
            `https://cdn.vox-cdn.com/thumbor/3r2B7ksqfoF2uOdHgzlg4c9VQKE=/0x0:640x427/1820x1213/filters:focal(0x0:640x427):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/37152424/reddit_logo_640.0.jpg`;
            output += `
                <div class="card mb-2">
                    <img class="card-img-top" src = "${image}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${truncateString(post.selftext, 50)}</p>
                    </div>
                    <a href="${post.url}" target="_blank" class="btn btn-primary m-2">Read More</a>
                </div>
            `;
        });
        output+= '</div>';
        document.getElementById('results').innerHTML = output;
    });

    event.preventDefault();
});

function showMessage(message, type) {
    const div = document.createElement('div');
    div.className = `alert ${type}`;
    div.appendChild(document.createTextNode(message));

    //Find position to insert alert message
    const searchContainer = document.getElementById('search-container');
    const title = document.getElementById('search');

    searchContainer.insertBefore(div, title);

    //Remove message after certain period of time
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}


//Reduce string to appropriate length
function truncateString(text, length) {
    if(text.length > 50) {
        //Store the position index of first blank that appears from the lenght position
        const shortend = text.indexOf(' ', length);
        if(shortend == -1) return text;
        let newText = `${text.substring(0, shortend)}...`;
        return newText;
    }
    return text;
}