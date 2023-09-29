// Very rudimentary Wavefront .obj file format loader.
// Doesn't support many features but good enough for our use case.
// https://en.wikipedia.org/wiki/Wavefront_.obj_file
const loadObj = (content) => {
  const positions = [];
  const normals = [];
  const textcoords = [];
  const vertices = [];

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
          // Triangle vertex value.
          parts.slice(1, 4).map((v) => {
            // Separate the values.
            const parts = v.split("/").map((v) => Number(v));

            // Create a new vertex. With the given position, normal, and texture coordinate values.
            vertices.push(
              ...positions[parts[0] - 1],
              ...textcoords[parts[1] - 1],
              ...normals[parts[2] - 1],
            );
          });
          break;

        default:
          console.error(`Unsupported syntax "${line}"`);
          break;
      }
    });

  return vertices;
};

const vertexShaderSrc = `#version 300 es

layout(location = 0) in vec3 pos;

uniform mat4 projection;
uniform mat4 view;

void main() {
  gl_Position = projection * view * vec4(pos, 1.0);
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
    // Resize viewport.
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

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
      gl.bufferData(gl.ARRAY_BUFFER, obj, gl.STATIC_DRAW);

      // First location is the position values.
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 8 * 4, 0);

      const projectionLoc = gl.getUniformLocation(program, "projection");
      const viewLoc = gl.getUniformLocation(program, "view");

      const perspective = (fov, aspect, near, far) => {
        const f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
        const inv = 1.0 / (near - far);
        return [
          f / aspect,
          0,
          0,
          0,
          0,
          f,
          0,
          0,
          0,
          0,
          (near + far) * inv,
          -1,
          0,
          0,
          near * far * inv * 2,
          0,
        ];
      };

      gl.uniformMatrix4fv(projectionLoc, false, perspective(3, 1, 0.1, 100));
      gl.uniformMatrix4fv(
        viewLoc,
        false,
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -20, -40, -20, 1],
      );

      const triangles = obj.length / 3;

      drawObj = () => {
        gl.drawArrays(gl.TRIANGLES, 0, triangles);
      };

      draw();
    });
})();
