(function () {
  // Create canvas for WebGL.
  const canvas = document.createElement("canvas");

  // Reasonable size.
  canvas.width = 640;
  canvas.height = 480;

  const gl = canvas.getContext("webgl2");

  content.appendChild(canvas); // eslint-disable-line

  const draw = () => {
    // Clear canvas.
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  };
  draw();
})();
