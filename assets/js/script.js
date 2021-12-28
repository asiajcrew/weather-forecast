var getWeather = function(city) {
    var firstApi = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=74039307c6a5e337a6ba13ed703954c6"
    fetch(firstApi)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        var lat = data.coord.lat
        var lon = data.coord.lon
        var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly&appid=74039307c6a5e337a6ba13ed703954c6"
        fetch(apiUrl)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
        })
    }); 
}

var button = document.getElementById("search-button")
button.addEventListener("click", function(){
    var input = document.getElementById("user-input").value
    console.log(input);
  getWeather(input);
})

