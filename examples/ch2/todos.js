const todos = ['Buy groceries', 'Go to the gym', 'Finish the project'];

const addTodoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todos-list');


// Initialize the view
for (const todo of todos) {                       
    todoList.append(renderTodoInReadMode(todo))
}

// Add event listeners
addTodoInput.addEventListener('input', () => {
    addTodoBtn.disabled = addTodoInput.value.length < 3;
});

addTodoInput.addEventListener('keydown', ({ key }) => {     
    if (key === 'Enter' && addTodoInput.value.length >= 3) {
      addTodo()
    }
});

addTodoBtn.addEventListener('click', () => { 
    addTodo();
});

// Functions
function renderTodoInReadMode(todo) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = todo;
    span.addEventListener('dblclick', () => {
        const idx = todos.indexOf(todo);

        todoList.replaceChild(
            renderTodoInEditMode(todo),
            todoList.childNodes[idx]);
    });

    li.append(span);

    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.addEventListener('click', () => {
        const idx = todos.indexOf(todo);
        removeTodo(idx);
    });

    li.append(button);

    return li;
}

function addTodo() {

}

function removeTodo(idx) {
}