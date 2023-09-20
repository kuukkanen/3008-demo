// eslint-disable-next-line
function main() {
  // Get the container element
  var btnContainer = document.getElementById("header-right");

  // Get all buttons with class="btn" inside the container
  var btns = btnContainer.getElementsByTagName("a");
  console.log(btns);

  // Loop through the buttons and add the active class to the current/clicked button
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
      console.log("Clicked");
    });
  }
}
