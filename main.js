const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");
const clearBtn = document.getElementById("clearBtn");

let tasks = [
  { text: "Learn JavaScript", completed: false },
  { text: "Practice Coding", completed: false },
  { text: "Learn React", completed: false },
];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", function () {
      tasks[index].completed = checkbox.checked;
      renderTasks();
    });

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "♧";
    deleteBtn.textContent = "▤";
    deleteBtn.setAttribute("aria-label", "Delete task");

    // បង្ហាញរូបសញ្ញាធុងសំរាម
    deleteBtn.innerHTML = "🗑";

    deleteBtn.addEventListener("click", function () {
      tasks.splice(index, 1);
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  taskCount.textContent = "Tasks: " + tasks.length;

  const completed = tasks.filter((task) => task.completed).length;

  completedCount.textContent = "Completed: " + completed;
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = taskInput.value.trim();

  if (text === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({
    text: text,
    completed: false,
  });

  taskInput.value = "";
  taskInput.focus();

  renderTasks();
});

clearBtn.addEventListener("click", function () {
  if (tasks.length === 0) {
    return;
  }

  if (confirm("Are you sure you want to clear all tasks?")) {
    tasks = [];
    renderTasks();
  }
});

renderTasks();
