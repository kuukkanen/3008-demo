// eslint-disable-next-line
function main() {
  // Get all "buttons" from the header.
  const buttons = document.querySelectorAll(".header nav a");
  // Get the default hash from the first button.
  const defaultHash = new URL(buttons[0].href).hash;

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
      // If active is found set `hasActive` to true.
      if (hash === currentHash) hasActive = true;
    }
    // If no button was activated. This means that the demo is invalid.
    if (!hasActive) location.replace(defaultHash); // Use the default hash.
  }

  // Listen to history changes.
  window.addEventListener("popstate", updateActive);
  updateActive(); // Also update immediately.
}

// Color Generator
function generateNewColor() {
  btn = document.getElementById('color-changer');
  let color = "#";
  let x = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D', 'E','F']

  for(let i = 0; i < 6;i++){
      const random = Math.floor(Math.random() * x.length);
      color += x[random];
  }

  btn.style.background = color;
  return;
}