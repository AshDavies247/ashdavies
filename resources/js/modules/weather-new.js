import $ from 'jquery';

const weatherDetect = {

    init() {
        this.$bgArea = $('.content');
        this.$loc = $('[data-js-weather="loc"]');
        this.$temp = $('[data-js-weather="temp"]');
        this.$cond = $('[data-js-weather="cond"]');
        this.$controls = $('[data-js-weather="control"]');
        this.$index = {
            2 : 'thunderstorm',
            3 : 'drizzle',
            5 : 'rain',
            6 : 'snow',
            7 : 'atmosphere',
            8 : 'clear',
            9 : 'clouds'
        }

        this.getWeather();
        this.eventHandlers();
    },

    getWeather() {

        $.get('https://api.openweathermap.org/data/2.5/weather?q=london,uk&appid=e447b53b0468e8185e7be1f1a16daccd',
            (data) => {
                this.readWeather(data)
            }
        );

    },

    readWeather(data) {
        
        this.location = data.name;
        this.temp = data.main.temp;
        this.condition = data.weather[0].id.toString().charAt(0);
        this.description = data.weather[0].description;

        this.setWeatherContent(this.condition,this.location,this.temp,this.description);

        
    },

    setWeatherContent(condition,location,temp,description) {
        
        this.$loc.html(location);
        this.$temp.html(temp);
        this.$cond.html(description);
        this.$bgArea.css('background-image', 'url(media/' + this.$index[condition] + '.gif)');
        
    },

    eventHandlers() {
        $('[data-js-weather="control"]').on('click',this.changeBG.bind(this));
    },

    changeBG(e) {
        this.control = $(e.currentTarget).attr('id');

        this.setWeatherContent(this.control);
    }
}

weatherDetect.init();