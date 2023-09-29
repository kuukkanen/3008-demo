// Very rudimentary Wavefront .obj file format loader.
// Doesn't support many features but good enough for our use case.
// https://en.wikipedia.org/wiki/Wavefront_.obj_file
const loadObj = (content) => {
  const positions = [];
  const normals = [];
  const textcoords = [];
  const faces = [];

  // Loop through every line.
  content
    .trim()
    .split("\n")
    .forEach((line) => {
      const parts = line.split(" ");
      switch (parts[0]) {
        case "v":
          // Position value. Map to number values from string values.
          positions.push(parts.slice(1, 4).map((v) => Number(v)));
          break;

        case "vn":
          // Normal coordinate value. Map to number values from string values.
          normals.push(parts.slice(1, 4).map((v) => Number(v)));
          break;

        case "vt":
          // Texture coordinate value. Map to number values from string values.
          textcoords.push(parts.slice(1, 3).map((v) => Number(v)));
          break;

        case "f":
          // Triangle face value.
          parts.slice(1, 4).map((v) => {
            // Separate the values.
            const parts = v.split("/");

            // Create a new face. With the given position, normal, and texture coordinate values.
            faces.push({
              pos: positions[parts[0]],
              norm: normals[parts[1]],
              tex: textcoords[parts[2]],
            });
          });
          break;

        default:
          console.error(`Unsupported syntax "${line}"`);
          break;
      }
    });

  return faces;
};

const vertexShaderSrc = `#version 300 es
layout(location = 0) in vec3 pos;

void main() {
  gl_Position = vec4(pos, 1.0);
}
`;

const fragmentShaderSrc = `#version 300 es
precision highp float;

out vec4 color;

void main() {
  color = vec4(1.0);
}
`;

(function () {
  // Create canvas for WebGL.
  const canvas = document.createElement("canvas");

  // Reasonable size.
  canvas.width = 640;
  canvas.height = 480;

  const gl = canvas.getContext("webgl2");

  content.appendChild(canvas); // eslint-disable-line

  // Create the shader program.
  const createProgram = () => {
    // Create and compile vertex shader.
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSrc);
    gl.compileShader(vertexShader);

    // Create and compile fragment shader.
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSrc);
    gl.compileShader(fragmentShader);

    // Create and link the program.
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    // Shaders are no longer needed.
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    return program;
  };

  const program = createProgram();

  gl.useProgram(program); // Enable the shader program.

  // No-op draw function at first and after object is loaded we implement this fully.
  let drawObj = () => {};

  // The main draw function.
  const draw = () => {
    // Clear canvas.
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    drawObj();
  };

  fetch("cat.obj")
    .then((res) => res.text())
    .then((content) => {
      const obj = loadObj(content);

      // Buffer with the location data.
      const locationBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, locationBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        obj.map((face) => face.pos),
        gl.STATIC_DRAW,
      );

      // First location is the position values.
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

      drawObj = () => {
        gl.drawArrays(gl.TRIANGLES, 0, obj.length / 3);
      };

      draw();
    });
})();
