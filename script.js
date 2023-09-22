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
// eslint-disable-next-line
function generateNewColor() {
  // Get the color changing button.
  const button = document.getElementById("color-changer");

  // Generate random color with a random R, G, and B values.
  const color = {
    r: Math.random(),
    g: Math.random(),
    b: Math.random(),
  };

  // Calculate the perceived brightness of the color.
  // https://en.wikipedia.org/wiki/Luma_(video)#Rec._601_luma_versus_Rec._709_luma_coefficients
  const luminance = Math.sqrt(
    0.299 * color.r ** 2 + 0.587 * color.g ** 2 + 0.114 * color.b ** 2,
  );

  // Change the color to the random one.
  button.style.backgroundColor = `rgb(${color.r * 255},${color.g * 255},${
    color.b * 255
  })`;
  // Make text more visible based on the brightness.
  button.style.color = luminance <= 0.5 ? "white" : "black";
  return;
}
