let content; // Content container. Used by demos.
let madeby; // Made by copyright holder.

// eslint-disable-next-line
function main() {
  // Get the made by copyright element.
  madeby = document.getElementById("madeby");

  // Get all "buttons" from the header.
  const buttons = document.querySelectorAll(".header nav a");
  // Get the default hash from the first button.
  const defaultHash = new URL(buttons[0].href).hash;
  // Get the content container.
  content = document.getElementById("content");
  // Get the title heading.
  const title = document.getElementById("title");

  // Get the navigation menu and hide it by default.
  const menu = document.querySelector("nav > ul");
  menu.style.visibility = "hidden";
  menu.style.opacity = "0";

  const hideMenu = () => {
    // Make menu hidden only after the opacity has faded.
    setTimeout(() => (menu.style.visibility = "hidden"), 200);
    menu.style.opacity = "0";
  };

  // When the menu button is clicked.
  document.getElementById("menu").onclick = () => {
    // If the menu is currently hidden.
    if (menu.style.visibility === "hidden") {
      // Make it visible and opaque.
      menu.style.visibility = "visible";
      menu.style.opacity = "1";
    } else {
      // If the menu is visible make it hidden by fading.
      hideMenu();
    }
  };

  function updateActive() {
    // Hide menu when page changes.
    hideMenu();

    let hasActive = false;
    // For each button in the header.
    for (const button of buttons) {
      // Get the hash part from the button link's URL.
      const hash = new URL(button.href).hash;
      // Get hash from the current URL.
      const currentHash = document.location.hash;
      // Make it active if it's the current one.
      button.classList.toggle("active", hash === currentHash);

      // Active hash.
      if (hash === currentHash) {
        // If active is found set `hasActive` to true.
        hasActive = true;

        // Change the title.
        document.title = `3008 Demo | ${button.textContent}`;
        title.textContent = document.title;

        madeby.textContent = "";
        content.innerHTML = ""; // Clear content.

        // Create lazily loaded demo script.
        const demoScript = document.createElement("script");
        // Get the script name from the hash.
        demoScript.src = hash.slice(1) + ".js";
        // Append the script to content.
        content.appendChild(demoScript);
      }
    }
    // If no button was activated. This means that the demo is invalid.
    if (!hasActive) location.replace(defaultHash); // Use the default hash.
  }

  // Listen to history changes.
  window.addEventListener("popstate", updateActive);
  updateActive(); // Also update immediately.
}
