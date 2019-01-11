// Weather API

var weatherBgArea = $('.content');
var weatherLoc = $('[data-js-weather="loc"]');
var weatherTemp = $('[data-js-weather="temp"]');
var weatherCond = $('[data-js-weather="cond"]');
var weatherControls = $('[data-js-weather="control"]');
var weatherIndex = {
    2 : 'thunderstorm',
    3 : 'drizzle',
    5 : 'rain',
    6 : 'snow',
    7 : 'atmosphere',
    8 : 'clear',
    9 : 'clouds'
}

weatherBgButtons();

fetch('https://api.openweathermap.org/data/2.5/weather?q=london,uk&appid=e447b53b0468e8185e7be1f1a16daccd')
    .then(function(response) {
        return response.json();
  })
    .then(function(myJson) {
        weatherGetId(myJson);
        weatherGetInfo(myJson);
});

function weatherGetId(data) {
    var weatherId = data['weather'][0]['id'];
    var weatherIdShort = weatherId.toString().charAt(0);
    weatherBgControl(weatherIdShort);
}

function weatherBgControl(id) {
    weatherChangeBg(id);
};

function weatherBgButtons() {
    weatherControls.on('click', function (e) {
        var control = $(e.currentTarget).attr('id');
        weatherChangeBg(control);
    })
};

function weatherChangeBg(id) {
    weatherBgArea.css('background-image', 'url(../media/' + weatherIndex[id] + '.gif)');

}

function weatherGetInfo(data) {
    var loc = data['name'];
    var deg = data['main']['temp'];
    var cond = data['weather'][0]['description'];
    weatherLoc.html(loc);
    weatherTemp.html(deg);
    weatherCond.html(cond);
}

// Todo list

var listInput = $('[data-js-list="input"]');
var listSubmit = $('[data-js-list="submit"]');
var listTodo = $('[data-js-list="todo"]');
var listDone = $('[data-js-list="done"]');
var itemTodo = $('[data-js-list="itemtodo"]')
var itemDone = $('[data-js-list="itemdone"]')

listSubmit.on('click', function () {

    var listData = listInput.val();

    if (listData) {
        var newListItem = $("<li>" + listData + "</li>");
        listTodo.append(newListItem);
        listInput.val('');
        styleListItem(newListItem);
    }
});

function styleListItem(li) {
    li.attr('data-js-list','itemtodo');
    li.addClass('list__item');
}

listTodo.on('click','li',function(e){
    listDone.append($(e.currentTarget));
    $(e.currentTarget).attr('data-js-list','itemdone');
});

listDone.on('click','li',function(e){
    listTodo.append($(e.currentTarget));
    $(e.currentTarget).attr('data-js-list','itemtodo');
});

$( window ).on('unload',function() {
    console.log('test');
    localStorage.setItem('test','test');
    localStorage.setItem('test','testing');
    localStorage.setItem('test','chest');
  });