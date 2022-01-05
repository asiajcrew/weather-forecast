var getWeather = function(city) {
    var locationApi = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=74039307c6a5e337a6ba13ed703954c6"
    fetch(locationApi)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        var lat = data.coord.lat
        var lon = data.coord.lon
        // display city & date
        var cityName = data.name
        var displayCity = document.getElementById("city-name");
        var date = new Date(data.dt*1000)
        displayCity.innerHTML = cityName + " " + date.toDateString()
        // use moment
        var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly&appid=74039307c6a5e337a6ba13ed703954c6"
        fetch(weatherApi)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        // display current temp
        var currentTemp = data.current.temp
        var displayCurrentTemp = document.getElementById("current-temp");
        displayCurrentTemp.innerHTML = "Temp: " + JSON.stringify(currentTemp) + " F"
        // display current wind
        var currentWind = data.current.wind_speed
        var displayCurrentWind = document.getElementById("current-wind");
        displayCurrentWind.innerHTML = "Wind: " + JSON.stringify(currentWind) + " MPH"
        // display current humidity
        var currentHumidity = data.current.humidity
        var displayCurrentHumidity = document.getElementById("current-humidity");
        displayCurrentHumidity.innerHTML = "Humidity: " + JSON.stringify(currentHumidity) + "%"
        // display current UV index
        var currentUV = data.current.uvi
        var displayCurrentUV = document.getElementById("current-UV");
        displayCurrentUV.innerHTML = "UV Index: " + JSON.stringify(currentUV)
        // display forecast temp
        for (i=1; i < 6; i++) {
            console.log(data.daily[i])
            var dailyWeather = data.daily[i];
            var date = new Date(dailyWeather.dt*1000)
            var displayDate = "day" + i
            document.getElementById(displayDate).innerHTML = date.toDateString()
            var tempEl= "day" + i + "-temp"
            document.getElementById(tempEl).innerHTML = "Temp: " + Math.floor((dailyWeather.temp.day-273.15)*1.80+32) + " F"
            var windEl= "day" + i + "-wind"
            document.getElementById(windEl).innerHTML = "Wind: " + dailyWeather.wind_speed + "MPH"
            var humidityEl= "day" + i + "-humidity"
            document.getElementById(humidityEl).innerHTML = "Humidity: " + dailyWeather.humidity + "%"
        }

    })
    });
};


// save user input to local storage
var button = document.getElementById("search-button")
button.addEventListener("click", function() {
    var input = document.getElementById("user-input").value
    getWeather(input);
localStorage.setItem("city", input);
// display recent search history onto the page
var searchHistory= localStorage.getItem("city")
var test = document.getElementById("1").textContent= searchHistory;
})

// retrieve & parse last items from local storage if there's data
// if theres no data then array = [] (empty array)
// disregard 9th items. add user input to array (if it doesnt already exist), add array to local storage.
// Stringify array when addding it to storage.
// 
