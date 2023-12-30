var apiKey = "51d4821afd708744cf080bebb2d5390a";

var cityInput = $('#city');
var searchBtn = $('#search-button');

$(searchBtn.on('click', function(event) {
    event.preventDefault();

    var cityInputVal = cityInput.val();
    console.log(cityInputVal)
    getGeo(cityInputVal);

}));

function getGeo(city) {
    var geoURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey

        // fetch(geoURL)
        // .then(function (response) {
        //     return response.json();
        //   })
        //   .then(function (data) {
        //     console.log(data)
})};
