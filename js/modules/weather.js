// Weather API

var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=e447b53b0468e8185e7be1f1a16daccd";
var request = new XMLHttpRequest();

var test = $('[data-js="test"]')

test.on('click',getWeather);


function getWeather() {
    request.open('GET',requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = weather;

}

function weather() {
    var currentWeather = request.response;

    console.log(currentWeather);

}