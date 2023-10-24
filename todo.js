(function () {
  let element = `
    <div class="container">
      <h1>ToDo List</h1>
      <input type="text" id="myInput" placeholder="Title..." />
      <span id="addElement">
          Add
      </span>

      <ul id="myUL">
        <li>Get groceries</li>
        <li>Pay the bills</li>
      </ul>
    </div>`;
  content = document.getElementById("content"); // eslint-disable-line
  content.innerHTML = element; // eslint-disable-line

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
