const todos = ['Buy groceries', 'Go to the gym', 'Finish the project'];

const addTodoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todos-list');

// Text-to-speech function for accessibility
function speakTodo(todoText) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(todoText);
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        speechSynthesis.speak(utterance);
    }
}

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

    const crossOutBtn = document.createElement('button');
    crossOutBtn.textContent = 'Cross Out';
    crossOutBtn.addEventListener('click', () => {
        const idx = todos.indexOf(todo);
        crossOutTodo(idx);
    });

    li.append(crossOutBtn);


    li.append(button);

    return li;
}

function renderTodoInEditMode(todo) {
    const li = document.createElement('li');

    const input = document.createElement('input');
    input.type = 'text';
    input.value = todo;
    li.append(input);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.addEventListener('click', () => {
        const idx = todos.indexOf(todo);
        updateTodo(idx, input.value);
    });

    li.append(saveBtn);


    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', () => {
        const idx = todos.indexOf(todo);
        todoList.replaceChild(
            renderTodoInReadMode(todo),
            todoList.childNodes[idx]);
    });

    li.append(cancelBtn);

    return li;
}

function updateTodo(index, description) {
    todos[index] = description;
    const todo = renderTodoInReadMode(description);
    todoList.replaceChild(todo, todoList.childNodes[index]);
}

function crossOutTodo(idx) {
    const child = todoList.childNodes[idx];
    const span = child.querySelector('span');
    const sElement = child.querySelector('s');
    
    if (sElement) {
        // If already crossed out, restore to normal
        const newSpan = document.createElement('span');
        newSpan.textContent = sElement.textContent;
        sElement.replaceWith(newSpan);
    } else if (span) {
        // If not crossed out, cross it out
        const sTodo = document.createElement('s');
        sTodo.textContent = span.textContent;
        span.replaceWith(sTodo);
    }
}


function addTodo() {
    const description = addTodoInput.value;

    todos.push(description);
    const todo = renderTodoInReadMode(description);
    todoList.append(todo);

    addTodoInput.value = '';
    addTodoBtn.disabled = true;

    // Speak the todo for accessibility
    speakTodo(description);
}

function removeTodo(idx) {
    todos.splice(idx, 1);
    todoList.childNodes[idx].remove();
}

