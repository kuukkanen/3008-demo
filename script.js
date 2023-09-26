let content; // Content container. Used by demos.

// eslint-disable-next-line
function main() {
  // Get all "buttons" from the header.
  const buttons = document.querySelectorAll(".header nav a");
  // Get the default hash from the first button.
  const defaultHash = new URL(buttons[0].href).hash;
  // Get the content container.
  content = document.getElementById("content");

  function updateActive() {
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