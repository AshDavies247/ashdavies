// Weather API

// jason request
var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=e447b53b0468e8185e7be1f1a16daccd";
var request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = weatherImgControl;

// background image chooser

var body = $('.content');
var weatherControls = $('[data-js-weather]');

function weatherImgControl() {

    // arrays of the first number of each weather category  ID. e.g 2 is the first number of the weather category ID of Thunderstorms, which is actually 200 in full.
    var weatherIndex = ['2', '3', '5', '6', '7', '8', '9'];

    // corresponding weather categories to the category ID.
    var weatherImgIndex = ['thunderstorm', 'drizzle', 'rain', 'snow', 'atmosphere', 'clear', 'clouds']

    // gets the ID of the current weather condition
    var weatherId = request.response['weather'][0]['id'];

    // picks out the first number of the above weather condition ID
    var weatherIdShort = weatherId.toString().charAt(0);

    // finds out which index the above number is in the weatherIndex array
    var weatherFinder = weatherIndex.indexOf(weatherIdShort);

    // changes the background image of the page to the relevant weather image.
    body.css('background-image', 'url(../media/' + weatherImgIndex[weatherFinder] + '.gif)');

    // Similar logic to above but using the number of the data attribute on the weather controls grid.
    weatherControls.on('click', function () {
        body.css('background-image', 'url(../media/' + weatherImgIndex[$(this).data()['jsWeather']] + '.gif)');
    })
}

// Todo list

var listInput = $('[data-js-list="input"]');
var listSubmit = $('[data-js-list="submit"]');
var listTodo = $('[data-js-list="todo"]');
var listDone = $('[data-js-list="done"]');

listSubmit.on('click', function () {

    var listData = listInput.val();

    if (listData) {

        var listItem = listTodo.append($("<li>" + listData + "</li>"));

        listInput.val('');
    }
})