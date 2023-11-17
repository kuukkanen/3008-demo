(function () {
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
        <li>Get groceries</li>
        <li>Pay the bills</li>
      </ul>
    </div>`;
  content = document.getElementById("content"); // eslint-disable-line
  content.innerHTML = element; // eslint-disable-line

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
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("X");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }

  // Click on a close button to hide the current list item
  document.getElementById("myUL").addEventListener("click", function (ev) {
    if (ev.target.className === "close") {
      const div = ev.target.parentElement;
      div.style.display = "none";
    }
  });

  // click add to create new list item
  function addListItem() {
    const li = document.createElement("li");
    const inputValue = document.getElementById("myInput").value;
    const t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === "") {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
    // clear input text
    document.getElementById("myInput").value = "";

    const span = document.createElement("SPAN");
    const txt = document.createTextNode("X");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function () {
      const div = this.parentElement;
      div.style.display = "none";
    };
  }

  document.getElementById("addElement").addEventListener("click", addListItem);
})();
