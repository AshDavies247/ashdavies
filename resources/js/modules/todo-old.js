// Todo list

var listForm = $('[data-js-list="form"]');
var listInput = $('[data-js-list="input"]');
var listTodo = $('[data-js-list="todo"]');
var listDone = $('[data-js-list="done"]');
var test = $('[data-js-list="test"]');

getListItems();

listForm.on('submit', function (e) {
    e.preventDefault();
    var listData = listInput.val();

    if (listData) {
        createTodoItem(listData);
    }
});

function createTodoItem(data) {

    var newListItem = $("<li>" + data + "</li>");
    
    listTodo.append(newListItem);
    listInput.val('');
    newListItem.attr('data-js-list','itemtodo');
    newListItem.addClass('list__item');
    console.log(newListItem);
}




function createDoneItem(data) {

    var newListItem = $("<li>" + data + "</li>");
    
    listDone.append(newListItem);
    listInput.val('');
    newListItem.attr('data-js-list','itemdone');
    newListItem.addClass('list__item--done');
}

listTodo.on('click','li',function(e){
    listDone.append($(e.currentTarget));
    $(e.currentTarget).attr('data-js-list','itemdone');
    $(e.currentTarget).addClass('list__item--done');
});

listDone.on('click','li',function(e){
    listTodo.append($(e.currentTarget));
    $(e.currentTarget).attr('data-js-list','itemtodo');
    $(e.currentTarget).removeClass('list__item--done');
    $(e.currentTarget).addClass('list__item');
});

$( window ).on('unload',function() {
    var itemTodo = $('[data-js-list="itemtodo"]');
    var itemDone = $('[data-js-list="itemdone"]');
    todoArray = [];
    doneArray = [];

    itemTodo.each(function(){
        todoArray.push($(this).html());
    })

    itemDone.each(function(){
        doneArray.push($(this).html());
    })

    if (todoArray.length !==0 ){
        localStorage.setItem('todo',todoArray);
    } else {
        localStorage.removeItem('todo');
    }
    
    if (doneArray.length !==0 ){
        localStorage.setItem('done',doneArray);
    } else {
        localStorage.removeItem('done');
    }
  });

  function getListItems() {
    var todo =  localStorage.getItem('todo');
    var done = localStorage.getItem('done');

    if (todo){
        todoArray = todo.split(',');
        $.each(todoArray,function(e){
            createTodoItem(todoArray[e]);
        })
    }

    if (done) {
        doneArray = done.split(',');
        $.each(doneArray,function(e){
            createDoneItem(doneArray[e]);
        })
    }



  }