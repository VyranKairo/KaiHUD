const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

// To-Do List Logic
function addTask() {
  if (todoInput.value.trim() === "") return;

  createTasks(todoInput.value);

  saveTasks();

  todoInput.value = "";
  todoInput.focus();
}

// Entering to add tasks
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Creating tasks
function createTasks(text, completed = false) {
  const ul = todoList;

  const li = document.createElement("li");

  const taskText = document.createElement("span");
  taskText.className = "task-text";
  taskText.textContent = text;
  if (completed) {
    taskText.classList.add("completed");
  }

  const actions = document.createElement("div");
  actions.className = "actions";

  const doneBtn = document.createElement("span");
  doneBtn.className = "done-btn";
  doneBtn.textContent = completed ? "↻" : "✓";

  const delBtn = document.createElement("span");
  delBtn.className = "del-btn";
  delBtn.textContent = "×";

  actions.appendChild(doneBtn);
  actions.appendChild(delBtn);

  li.appendChild(taskText);
  li.appendChild(actions);

  ul.appendChild(li);

  doneBtn.addEventListener("click", () => {
    taskText.classList.toggle("completed");
    doneBtn.textContent = taskText.classList.contains("completed") ? "↻" : "✓";
    saveTasks();
  });

  delBtn.addEventListener("click", () => {
    li.style.opacity = "0";
    setTimeout(() => {
      li.remove();
      saveTasks();
    }, 200);
  });
}
// Saving tasks
function saveTasks() {
  const tasks = [];

  document.querySelectorAll("#todoList li").forEach((li) => {
    tasks.push({
      text: li.querySelector(".task-text").textContent,
      completed: li.querySelector(".task-text").classList.contains("completed"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Loading tasks
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createTasks(task.text, task.completed);
  });
}

loadTasks();
