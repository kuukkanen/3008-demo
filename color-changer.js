(function () {
  // Create color changer button.
  const button = document.createElement("button");
  button.style.borderRadius = "0.5rem";
  button.style.padding = "1rem";
  button.style.fontSize = "1rem";
  button.style.fontWeight = "bold";
  button.textContent = "Press to change Button Color";

  // Append to content.
  content.appendChild(button); // eslint-disable-line

  // Color Generator
  // eslint-disable-next-line
  button.onclick = function () {
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
  };
})();
