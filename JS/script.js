document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoDate = document.getElementById("todo-date");
  const todoList = document.getElementById("todo-list");
  const filterDate = document.getElementById("filter-date");
  const clearFilter = document.getElementById("clear-filter");

  let todos = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = todoInput.value.trim();
    const date = todoDate.value;

    if (!task || !date) return;

    const todo = {
      id: Date.now(),
      task,
      date,
      completed: false
    };

    todos.push(todo);
    renderTodos();
    form.reset();
  });

  function renderTodos() {
    todoList.innerHTML = "";

    const filteredTodos = filterDate.value
      ? todos.filter((todo) => todo.date === filterDate.value)
      : todos;

    if (filteredTodos.length === 0) {
      todoList.innerHTML = `<tr><td colspan="4" style="text-align:center; opacity:0.5;">No task found</td></tr>`;
      return;
    }

    filteredTodos.forEach((todo) => {
      const row = document.createElement("tr");
      if (todo.completed) row.classList.add("completed");

      const taskCell = document.createElement("td");
      taskCell.textContent = todo.task;

      const dateCell = document.createElement("td");
      dateCell.textContent = todo.date;

      const statusCell = document.createElement("td");
      statusCell.textContent = todo.completed ? "Done" : "Pending";

      const actionsCell = document.createElement("td");

      const toggleBtn = document.createElement("button");
      toggleBtn.innerHTML = '<span class="material-icons">check</span>';
      toggleBtn.title = "Toggle status";
      toggleBtn.onclick = () => {
        todo.completed = !todo.completed;
        renderTodos();
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<span class="material-icons">delete</span>';
      deleteBtn.title = "Delete task";
      deleteBtn.onclick = () => {
        todos = todos.filter((t) => t.id !== todo.id);
        renderTodos();
      };

      actionsCell.appendChild(toggleBtn);
      actionsCell.appendChild(deleteBtn);

      row.appendChild(taskCell);
      row.appendChild(dateCell);
      row.appendChild(statusCell);
      row.appendChild(actionsCell);

      todoList.appendChild(row);
    });
  }

  filterDate.addEventListener("change", renderTodos);

  clearFilter.addEventListener("click", () => {
    todos = [];
    renderTodos();
  });
});
