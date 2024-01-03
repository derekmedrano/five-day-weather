var apiKey = 'eee1f9e12d707b9e8ff0fa060b7d7705';
var countryCode = 'US';

var cityInput = $('#city');
var searchBtn = $('#search-button');


$(searchBtn.on('click', function(event) {
    event.preventDefault();
    var cityName = cityInput.val();

    getGeo(cityName);
    storeSearch(cityName);
    getSearch();

}));

function storeSearch (cityName) {
    var history = JSON.parse(localStorage.getItem('cities')) || [];
    if (!history.includes(cityName)) {
        history.push(cityName)
        localStorage.setItem('cities', JSON.stringify(history));
    }
}

function getSearch() {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
    $('#prev-searches').empty();
    for(var i = 0; i < cities.length; i++) {
        var searches = cities[i];
        var prevSearchesBtn = $('<button></button>');

        prevSearchesBtn.text(searches);
        prevSearchesBtn.addClass('row btn btn-secondary w-75 m-3');
        $(prevSearchesBtn.on('click', function(event) {
            event.preventDefault();
            
            getGeo(searches);

        }));

        $('#prev-searches').append(prevSearchesBtn);

        

    }
    
}

function getGeo(city) {
    var geoURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + countryCode + '&limit=5&appid=' + apiKey
    
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
    var kTemp = currentDay.main.temp
    var fTemp = Math.round((kTemp - 273.15) * 9/5 + 32)

    $('#city-name').text(cityName);
    $('#temp').text('Tempurature: ' + fTemp);
    $('#humidity').text('Humidity: ' + currentDay.main.humidity);
    $('#wind').text('Wind: ' + currentDay.wind.speed);

}

function fiveDay(list) {
    $('#five-day').empty()

    for(var i = 7; i < list.length; i += 8) {
        var day = list[i];
        var card = $('<div></div>')
        var date = $('<p></p>');
        var temp = $('<p></p>');
        var humidity = $('<p></p>');
        var wind = $('<p></p>');

        var kTemp = day.main.temp
        var fTemp = Math.round((kTemp - 273.15) * 9/5 + 32);
        
        
        date.text(dayjs.unix(day.dt).format("MM-DD-YYYY"));
        temp.text('Tempurature: ' + fTemp);
        humidity.text('Humidity: ' + day.main.humidity);
        wind.text('Wind: ' + day.wind.speed);
        $(card).append(date);
        $(card).append(temp);
        $(card).append(humidity);
        $(card).append(wind);

    


    $('#five-day').append(card);
 }
}



//LAST THINGS TO DO:
// NEED TO ADD ICONS!!!!!!!!! FIRST AND FOREMOST
// Fix history buttons
// Add formatting to the 5 days
// Add commments
// Do readme

