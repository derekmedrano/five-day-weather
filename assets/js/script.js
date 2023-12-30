var apiKey = "51d4821afd708744cf080bebb2d5390a";

var cityInput = $('#city');
var searchBtn = $('#search-button');

$(searchBtn.on('click', function(event) {
    event.preventDefault();

    var cityInputValue = cityInput.val();
    console.log(cityInputValue)
    //run function that inputs city into fetch

}));
