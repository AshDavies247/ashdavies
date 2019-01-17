import Handlebars from 'handlebars';

jQuery(function($){

    const enterKey = 13;

    var utils = {
        store: function() {
            localStorage.setItem('item',JSON.stringify(app.todos));
            this.retreive();
        },

        retreive: function() {
            var grabItems = localStorage.getItem('item');
            var parseItems = JSON.parse(grabItems);
            return app.todos = parseItems;
        }
    }

    var app = {
        init: function() {
            this.todos = [];
            this.bindEvents();
        },

        bindEvents: function() {
            $('[data-js-list="input"]').on('keyup',this.create.bind(this));
        },

        create: function(e){

            $val = $(event.target).val();
            $input = $(event.target);

            if (e.which !== enterKey || $val == 0) {
                return;
            } else {
                this.todos.push({
                    val: $val,
                    completed: false
                })
            }

            $input.val('');
            utils.store();
            this.render();
        },

        render: function(){
            var listTodo = $('[data-js-list="todo"]').html();
            var template = Handlebars.compile(listTodo);
            console.log(template);
        }
    };
    app.init();
});