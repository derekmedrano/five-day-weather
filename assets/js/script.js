// These variables are used in fetch URLs below, API key is generated from OpenWeatherMap API
var apiKey = 'eee1f9e12d707b9e8ff0fa060b7d7705';
var countryCode = 'US';

//Global selectors using JQuery
var cityInput = $('#city');
var searchBtn = $('#search-button');
var invalidMsg = $('#no-input-msg');
var delHistoryBtn = $('#del-history');
var iconEl = $('#cd-icon');

//Currently only displays a message if the user submits an empty input field
function invalidMsgFunc() {
    var invalidMsgTxt = $('<p></p>')
    invalidMsgTxt.text('Please enter valid city.')
    $(invalidMsg).append(invalidMsgTxt);
}

//Event listener for the search button. If the search field is invalid the user will see a message asking for a valid city name. If the city is valid it will
//run the getGeo() function which fetches the data using OpenWeatherMap API
$(searchBtn.on('click', function(event) {
    event.preventDefault();
    var cityName = cityInput.val();
    if (cityName !== ('')) {
        invalidMsg.empty();

        getGeo(cityName);
        storeSearch(cityName);
        getSearch();
//The city is also stored in search history and created as a button in the aside

    } else {
        invalidMsgFunc();
    }

}));

//A simple event listener that deletes the search history by making the 'cities' array in local storage empty []
$(delHistoryBtn.on('click', function(event) {
    event.preventDefault();
    localStorage.setItem('cities', JSON.stringify([]));
    $('#prev-searches').empty();
}));

//function that stores city names in localStorage if its not already in the array
function storeSearch (cityName) {
    var history = JSON.parse(localStorage.getItem('cities')) || [];
    if (!history.includes(cityName)) {
        history.push(cityName)
        localStorage.setItem('cities', JSON.stringify(history));
    }
}

//function that creates button elements in the aside using values stored in local storage
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
            var prevCity = $(this).text()
            
            getGeo(prevCity);

        }));

        $('#prev-searches').append(prevSearchesBtn);

        

    }
    
}

//The next 3 functions are responsible for the main content of the page

//this is the main function that the website runs on, as it is where the weather data is requested from OpenWeatherMap, then it displays the current weather for today and the next 5 days (currentWeather() and fiveDay() functions)
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

//Gets the data for the current weather and displays it on the page
function currentWeather(currentDay) {
    var cityName = cityInput.val();

    //A simple equation is needed to convert Kelvin to Faranheit
    var kTemp = currentDay.main.temp
    var fTemp = Math.round((kTemp - 273.15) * 9/5 + 32)

//Icon is a combination of data from getGeo() and the iconURL
    var iconCode = currentDay.weather[0].icon;
    var iconURL = 'http://openweathermap.org/img/w/' + iconCode + '.png';

    iconEl.attr('src', iconURL);
    $('#city-name').text(cityName);
    $('#temp').text('Tempurature: ' + fTemp + 'F');
    $('#humidity').text('Humidity: ' + currentDay.main.humidity + '%');
    $('#wind').text('Wind: ' + currentDay.wind.speed + ' MPH');

}
//fiveDay() function is mostly a for loop that takes weather data from the API and applies the information to a 5 "card" elements, these card elements are taken from Bootstrap!
function fiveDay(list) {
    var fiveDayDiv = $('#five-day');
    fiveDayDiv.empty();

    for(var i = 7; i < list.length; i += 8) {
        var day = list[i];
        var iconCode = day.weather[0].icon
        var iconURL = 'http://openweathermap.org/img/w/' + iconCode + '.png';

        //Cards are created inside of this div
        var card = $('<div></div>');
        card.addClass('card-body');

        //The content will be added to the cards here
        var icon = $('<img>');
        icon.attr('src', iconURL);


        var date = $('<p></p>');
        var temp = $('<p></p>');
        var humidity = $('<p></p>');
        var wind = $('<p></p>');

        var kTemp = day.main.temp;
        var fTemp = Math.round((kTemp - 273.15) * 9/5 + 32);
        
        
        date.text(dayjs.unix(day.dt).format("MM-DD-YYYY"));
        date.addClass('card-title');

        temp.text('Tempurature: ' + fTemp + 'F');
        temp.addClass('card-text');


        humidity.text('Humidity: ' + day.main.humidity + '%');
        humidity.addClass('card-text');

        wind.text('Wind: ' + day.wind.speed + " MPH");
        wind.addClass('card-text');

        $(card).append(icon);
        $(card).append(date);
        $(card).append(temp);
        $(card).append(humidity);
        $(card).append(wind);

    

    //and finally the content is appended to the 'card' div
    fiveDayDiv.append(card);
    
 }
}


