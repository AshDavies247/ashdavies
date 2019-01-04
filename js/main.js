// Weather API

// jason request
var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=e447b53b0468e8185e7be1f1a16daccd";
var request = new XMLHttpRequest();

request.open('GET',requestURL);
request.responseType = 'json';
request.send();
request.onload = weather;

// weather creation functions

var body = $('.content');

function weather() {

    var weatherList = ['2','3','5','6','7','8','9'];
    var bgList = ['thunderstorm','drizzle','rain','snow','atmosphere','clear','clouds']

    var weatherId = request.response['weather'][0]['id'];
    var weatherNum = weatherId.toString().charAt(0);

    var weatherNumTwo = weatherList.indexOf(weatherNum);
    
    body.css('background-image','url(../media/'+bgList[weatherNumTwo]+'.jpg)');
}