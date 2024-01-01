var apiKey = 'eee1f9e12d707b9e8ff0fa060b7d7705';
var countryCode = 'US';

var cityInput = $('#city');
var searchBtn = $('#search-button');
var cityInputVal = cityInput.val();

$(searchBtn.on('click', function(event) {
    event.preventDefault();

    console.log(cityInputVal)
    getGeo(cityInputVal);

}));

// func() to check storage and add any previous searches as buttons to the aside

function getGeo(city) {
    var geoURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' +countryCode + '&limit=5&appid=' + apiKey

    fetch(geoURL)
        .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        console.log('latitude=' + lat + 'longitude=' + lon);
    });
}; 

// func() to get current weather using getGeo()
    //add appropriate icons
//func() to get 5 day weather forecast using getGeo()

//func() to store it in local storage
