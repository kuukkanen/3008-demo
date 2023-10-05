(function () {
  // Create canvas for the game.
  const canvas = document.createElement("canvas");

  // Reasonable size.
  canvas.width = 640;
  canvas.height = 480;

  // Get the drawing context.
  const ctx = canvas.getContext("2d", { alpha: false });

  content.appendChild(canvas); // eslint-disable-line

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Create observer for the container element.
  const observer = new MutationObserver((e) => {
    // The canvas was removed.
    if (e[0].removedNodes) {
      observer.disconnect(); // Stop observing.
    }
  });

  // Observer DOM changes.
  observer.observe(content, { childList: true }); // eslint-disable-line
})();
