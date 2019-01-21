import jQuery from 'jquery';

jQuery(function($) {

    var utils = {
        weatherIndex: {
            2 : 'thunderstorm',
            3 : 'drizzle',
            5 : 'rain',
            6 : 'snow',
            7 : 'atmosphere',
            8 : 'clear',
            9 : 'clouds'
        },

    };

    var app = {
        init: function() {
            fetch('https://api.openweathermap.org/data/2.5/weather?q=london,uk&appid=e447b53b0468e8185e7be1f1a16daccd')
            .then(function(response) {
                return response.json();
            })
        }
    };

    app.init();
    
});