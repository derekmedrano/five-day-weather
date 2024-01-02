var apiKey = 'eee1f9e12d707b9e8ff0fa060b7d7705';
var countryCode = 'US';

var cityInput = $('#city');
var searchBtn = $('#search-button');


$(searchBtn.on('click', function(event) {
    event.preventDefault();
    var cityName = cityInput.val();

    console.log(cityName)
    getGeo(cityName);

}));

// ADD func() to check storage and add any previous searches as buttons to the aside

function getGeo(city) {
    var geoURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + countryCode + '&limit=5&appid=' + apiKey
    console.log(city);
    fetch(geoURL)
        .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        // var lat = data.list[0].coord.lat;
        // var lon = data.list[0].coord.lon;
        // console.log('latitude=' + lat + 'longitude=' + lon);
    });
}; 

// ADD func() to get current weather using getGeo()
    //add appropriate icons

// ADD func() to get 5 day weather forecast using getGeo()

// ADD func() to store it in local storage
