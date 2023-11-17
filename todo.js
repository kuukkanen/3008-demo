(function () {
  const savedTodo = localStorage.getItem("todoList");

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
        ${savedTodo}
      </ul>
    </div>`;
  content = document.getElementById("content"); // eslint-disable-line
  content.innerHTML = element; // eslint-disable-line

  // update localStorage
  function updateLocalStorage() {
    const listItems = document.querySelectorAll("#myUL li");
    const todoList = Array.from(listItems).map((item) => item.textContent);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }

  // toggle "line-through" when clicking on a list item
  const list = document.querySelector("#myUL");
  list.addEventListener(
    "click",
    (ev) => {
      if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked");
      }
    },
    false
  );

  // Create a "close" button and append it to each list item
  const myNodelist = document.getElementById("myUL").getElementsByTagName("LI"); //only myUL li:s
  for (let i = 0; i < myNodelist.length; i++) {
    const span = createCloseButton();
    myNodelist[i].appendChild(span);
  }

  // Click on a close button to hide the current list item
  document.getElementById("myUL").addEventListener("click", function (ev) {
    if (ev.target.className === "close") {
      const div = ev.target.parentElement;
      div.style.display = "none";
    }
  });

  // function to create close button
  function createCloseButton() {
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("X");
    span.className = "close";
    span.appendChild(txt);

    // click handling for close button
    span.onclick = function () {
      const div = this.parentElement;
      div.style.display = "none";
      updateLocalStorage();
    };

    return span;
  }

  // function to create new list item
  function createListItem(value) {
    const li = document.createElement("li");
    const t = document.createTextNode(value);
    li.appendChild(t);

    // attach close button
    const span = createCloseButton();
    li.appendChild(span);

    return li;
  }

  // function to add new list item
  function addListItem() {
    const inputValue = document.getElementById("myInput").value;
    if (inputValue === "") {
      alert("You must write something!");
    } else {
      const newListItem = createListItem(inputValue);
      document.getElementById("myUL").appendChild(newListItem);
      updateLocalStorage();
    }

    // clear input text
    document.getElementById("myInput").value = "";
  }

  document.getElementById("addElement").addEventListener("click", addListItem);
})();
