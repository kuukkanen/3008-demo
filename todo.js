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

  // toggle "line-through" when clicking on a list item
  let list = document.querySelector("#myUL");
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
  let myNodelist = document.getElementById("myUL").getElementsByTagName("LI"); //only myUL li:s
  for (i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("X");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }

  // Click on a close button to hide the current list item
  var close = document.getElementsByClassName("close");
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }

  // click add to create new list item
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
    // clear input text
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("X");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  });
})();
