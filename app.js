// SELECTORS
const todoInput = document.querySelector(`.todo-input`);
const todoBtn = document.querySelector(`.todo-btn`);
const todoList = document.querySelector(`.todo-list`);
const filterOption = document.querySelector(`.filter-todo`);

// EVENT LISTENERS
todoBtn.addEventListener(`click`, addTodo);
todoList.addEventListener(`click`, deleteCheck);
filterOption.addEventListener(`click`, filterTodo);
document.addEventListener(`DOMContentLoaded`, getTodos);

// FUNCTIONS
function addTodo(e) {
  // Prevent form from initializing
  e.preventDefault();

  // Create TODO DIV
  const todoDiv = document.createElement(`div`);
  todoDiv.classList.add(`todo`);

  // Create LI
  const newTodo = document.createElement(`li`);
  newTodo.classList.add(`todo-item`);
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);

  // ADD TODO localStorage
  saveLocalTodos(todoInput.value);

  // Check Mark Button
  const completedBtn = document.createElement(`button`);
  completedBtn.classList.add(`completed-btn`);
  completedBtn.innerHTML = `<i class="fas fa-check"></i>`;
  todoDiv.appendChild(completedBtn);

  // Check Trash Button
  const trashBtn = document.createElement(`button`);
  trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
  trashBtn.classList.add(`trash-btn`);
  todoDiv.appendChild(trashBtn);

  // APPEND to list
  todoList.appendChild(todoDiv);

  // Clear Input area
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  // Delete TODO
  if (item.classList[0] === `trash-btn`) {
    const todo = item.parentElement;

    //Animation
    todo.classList.add(`fall`);
    removeLocalTodos(todo);
    todo.addEventListener(`transitionend`, function () {
      todo.remove();
    });
  }

  //Check Mark
  if (item.classList[0] === `completed-btn`) {
    const todo = item.parentElement;
    todo.classList.toggle(`completed`);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case `all`:
        todo.style.display = `flex`;
        break;
      case `completed`:
        if (todo.classList.contains(`completed`)) {
          todo.style.display = `flex`;
        } else {
          todo.style.display = `none`;
        }
        break;
      case `uncompleted`:
        if (!todo.classList.contains(`completed`)) {
          todo.style.display = `flex`;
        } else {
          todo.style.display = `none`;
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //Check ---Hey Do I already have thing in there?
  let todos;
  if (localStorage.getItem(`todos`) === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(`todos`));
  }

  todos.push(todo);
  localStorage.setItem(`todos`, JSON.stringify(todos));
}

function getTodos() {
  let todos;
  //CHECK --- HEY do I already have things in there?
  if (localStorage.getItem(`todos`) === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(`todos`));
  }

  todos.forEach(function (todo) {
    // Create TODO DIV
    const todoDiv = document.createElement(`div`);
    todoDiv.classList.add(`todo`);

    // Create LI
    const newTodo = document.createElement(`li`);
    newTodo.classList.add(`todo-item`);
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);

    // Check Mark Button
    const completedBtn = document.createElement(`button`);
    completedBtn.classList.add(`completed-btn`);
    completedBtn.innerHTML = `<i class="fas fa-check"></i>`;
    todoDiv.appendChild(completedBtn);

    // Check Trash Button
    const trashBtn = document.createElement(`button`);
    trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    trashBtn.classList.add(`trash-btn`);
    todoDiv.appendChild(trashBtn);

    // APPEND to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  //CHECK --- HEY do I already have things in there?
  if (localStorage.getItem(`todos`) === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(`todos`));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem(`todos`, JSON.stringify(todos));
}
