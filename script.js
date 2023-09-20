// eslint-disable-next-line
function main() {
  // Get all "buttons" from the header.
  const buttons = document.querySelectorAll(".header nav a");

  function updateActive() {
    // For each button in the header.
    for (const button of buttons) {
      // Get the hash part from the button link's URL.
      const hash = new URL(button.href).hash;
      // Get hash from the current URL.
      const currentHash = document.location.hash;
      // Make it active if it's the current one.
      button.classList.toggle("active", hash === currentHash);
    }
  }

  // Listen to history changes.
  window.addEventListener("popstate", updateActive);

  // Make "#home" demo active by default.
  const currentLocation = document.location;
  currentLocation.hash = "#home";
  location.replace(currentLocation);
}
