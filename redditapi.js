export default {
    search: function(searchTerm, searchLimit, sortBy) {
        return fetch(`http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`)
            .then(result => result.json())
            .then(data => {
                return data.data.children.map(data => data.data);
            }) 
            .catch(error => console.log(error));
    }
}