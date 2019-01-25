import Handlebars from 'handlebars';
import jQuery from 'jquery';

jQuery(function($){

    const enterKey = 13;

    var utils = {
        store: function() {
            localStorage.setItem('item',JSON.stringify(app.todos));
        },

        retreive: function() {
            var grabItems = localStorage.getItem('item');
            var parseItems = JSON.parse(grabItems);
            return app.todos = parseItems || [];
        }
    }

    var app = {
        init: function() {
            this.todos = utils.retreive();
            // this.render();
            this.bindEvents();
        },

        bindEvents: function() {
            $('[data-js-list="input"]').on('keyup',this.create.bind(this));
            $('[data-js-list="delete-all"]').on('click',this.deleteAll.bind(this));
            $('[data-js-list="todo"]').on('click','[data-js-list="complete"]',this.complete.bind(this));
            $('[data-js-list="todo"]').on('click','[data-js-list="delete"]',this.delete.bind(this));
            $('[data-js-list="menu"]').on('click','[data-js-list="delete-complete"]',this.deleteCompleted.bind(this));
            $('[data-js-list="menu"]').on('click','[data-js-list="complete-all"]',this.completeAll.bind(this));
        },

        create: function(e){
            
            const $input = $(event.target);
            const val = $input.val();
            
            if (e.which !== enterKey || !val) {
                return;
            } else {
                this.todos.push({
                    val: val,
                    completed: false
                })
            }

            $input.val('');
            utils.store();
            this.render();
        },

        render: function(){

            const template = Handlebars.compile($('[data-js-hb="todo-template"]').html());
            $('[data-js-list="todo"]').html(template(this.todos));
        },

        deleteAll: function() {
            localStorage.removeItem('item');
            this.todos = [];
            this.render();
        },

        complete: function() {
            var li = event.target.closest('li');
            var itemIndex = this.getIndex(li);
            var item = this.todos[itemIndex];

            item.completed = !item.completed;
            utils.store();
            this.render();
        },

        getIndex: function(el) {
            var val = $(el).data('js-value');
            var i = this.todos.length;

            while(i--) {
                if(this.todos[i].val === val) {
                    return i;
                }
            }
        },

        delete: function() {
            var li = event.target.closest('li');
            var itemIndex = this.getIndex(li);

            this.todos.splice(itemIndex,1);
            utils.store();
            this.render();
        },

        getActive: function() {
            return this.todos.filter(function(todo){
                return !todo.completed;
            })

        },

        deleteCompleted: function() {
            this.todos = this.getActive();
            this.render();
        },

        completeAll: function() {

            var i = this.todos.length;

            while(i--) {
                if(this.todos[i].completed === false) {
                    this.todos[i].completed = true;
                }
            }
            this.render();
        }
    };
    app.init();
});