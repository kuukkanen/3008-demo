(function () {
  madeby.textContent = "Lassi Inkinen"; // eslint-disable-line

  let todoList = JSON.parse(localStorage.getItem("tasks")) ?? [];

  const element = `
    <div class="container">
      <h1>ToDo List</h1>
      <div class="header">
        <input type="text" id="myInput" placeholder="Title..." />
        <span id="addElement" class="addBtn">
            Add
        </span>
      </div>

      <ul id="myUL">
      </ul>
    </div>`;
  content = document.getElementById("content"); // eslint-disable-line
  content.innerHTML = element; // eslint-disable-line

  loadList();

  // create li elements from localStorage
  function loadList() {
    if (!todoList) return;

    const list = document.querySelector("#myUL");
    todoList.forEach((task) => {
      const li = document.createElement("li");
      const deleteBtn = document.createElement("span");
      // Conditionally apply a class based on the value of task.checked
      const checkedClass = task.checked ? "checked" : "";
      li.className = checkedClass;
      li.innerHTML = `${task.task}`;
      deleteBtn.className = "close";
      deleteBtn.textContent = "X";
      deleteBtn.addEventListener("click", () => {
        deleteTask(li, task);
      });

      li.appendChild(deleteBtn);
      list.insertBefore(li, list.children[0]);
    });
  }

  // update localStorage
  function updateLocalStorage() {
    const listItems = document.querySelectorAll("#myUL li");
    const newTodoList = Array.from(listItems).map((item) => {
      const taskText = item.childNodes[0].nodeValue.trim(); // task text content
      const checked = item.className;
      return { task: taskText, checked };
    });
    localStorage.setItem("tasks", JSON.stringify(newTodoList));
  }

  // toggle "line-through" when clicking on a list item
  const list = document.querySelector("#myUL");
  list.addEventListener("click", (ev) => {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
      updateLocalStorage();
    }
  });

  // function to add new list item
  function addListItem() {
    const inputValue = document.getElementById("myInput").value;
    if (inputValue === "") {
      alert("You must write something!");
    } else {
      const list = document.querySelector("#myUL");
      const li = document.createElement("li");
      const deleteBtn = document.createElement("span");
      li.innerHTML = `${inputValue}`;
      deleteBtn.className = "close";
      deleteBtn.textContent = "X";

      //click event to delete created task
      deleteBtn.addEventListener("click", () => {
        deleteTask(li, { task: inputValue });
      });

      li.appendChild(deleteBtn);
      list.insertBefore(li, list.children[0]);

      //save to localStorage
      localStorage.setItem(
        "tasks",
        JSON.stringify([
          ...(JSON.parse(localStorage.getItem("tasks")) ?? []),
          {
            task: inputValue,
            checked: "",
          },
        ]),
      );
    }
    // clear input text
    document.getElementById("myInput").value = "";
  }
  document.getElementById("addElement").addEventListener("click", addListItem);

  // delete a task
  function deleteTask(li, task) {
    li.remove();
    todoList = todoList.filter((t) => t.task !== task.task);

    updateLocalStorage();
  }
})();
