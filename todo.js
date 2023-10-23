(function () {
  let element = `
    <div class="container">
      <h1>ToDo List</h1>
      <input type="text" id="myInput" placeholder="Title..." />
      <ul id="myUL">
        <li>Get groceries</li>
        <li>Pay the bills</li>
      </ul>
    </div>`;
  content = document.getElementById("content"); // eslint-disable-line
  content.innerHTML = element; // eslint-disable-line
})();
