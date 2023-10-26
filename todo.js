(function () {
  let element = `
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

  // add a "line-through" when clicking on a list item
  let list = document.querySelector("#myUL");
  list.addEventListener(
    "click",
    (ev) => (ev.target.style.textDecoration = "line-through")
  );

  // click add to add new list item
  document.getElementById("addElement").addEventListener("click", function () {
    let li = document.createElement("li");
    let inputValue = document.getElementById("myInput").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === "") {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";
  });
})();
