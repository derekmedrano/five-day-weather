var apiKey = 'eee1f9e12d707b9e8ff0fa060b7d7705';
var countryCode = 'US';

var cityInput = $('#city');
var searchBtn = $('#search-button');


$(searchBtn.on('click', function(event) {
    event.preventDefault();
    var cityName = cityInput.val();

    console.log(cityName)
    getGeo(cityName);
    storeSearch(cityName);

}));

function storeSearch (cityName) {
    var history = JSON.parse(localStorage.getItem('cities')) || [];
    if (!history.includes(cityName)) {
        history.push(cityName)
        localStorage.setItem('cities', JSON.stringify(history));
    }
}

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
        currentWeather(data.list[0]);
        fiveDay(data.list);

    });
}; 

function currentWeather(currentDay) {
    var cityName = cityInput.val();
    $('#city-name').text(cityName);
    $('#temp').text('Tempurature:' + currentDay.main.temp);
    $('#humidity').text('Humidity:' + currentDay.main.humidity);
    $('#wind').text('Wind:' + currentDay.wind.speed);

}

function fiveDay(list) {
 for(var i = 7; i < list.length; i+=8) {
    var day = list[i];
    var card = $('<div></div>')
    var date = $('<p></p>');
    var temp = $('<p></p>');
    var humidity = $('<p></p>');
    var wind = $('<p></p>');
    
    date.text(dayjs.unix(day.dt).format("MM-DD-YYYY"));
    temp.text(day.main.temp);
    humidity.text(day.main.humidity);
    wind.text(day.wind.speed);
    $(card).append(date);
    $(card).append(temp);
    $(card).append(humidity);
    $(card).append(wind);

    


    $('#five-day').append(card);
 }
}


