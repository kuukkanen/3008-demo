(function () {
  // Create canvas for the game.
  const canvas = document.createElement("canvas");

  // Reasonable size.
  canvas.width = 640;
  canvas.height = 480;

  // Get the drawing context.
  const ctx = canvas.getContext("2d", { alpha: false });

  content.appendChild(canvas); // eslint-disable-line

  // True while the game is running.
  let isRunning = true;

  // Create observer for the container element.
  const observer = new MutationObserver((e) => {
    // The canvas was removed.
    if (e[0].removedNodes) {
      observer.disconnect(); // Stop observing.
      isRunning = false;
    }
  });

  // Observer DOM changes.
  observer.observe(content, { childList: true }); // eslint-disable-line

  const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 1,
    dy: 1,
    speed: 5,
    draw() {
      // Draw the white ball.
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, Math.PI * 2);
      ctx.fill();
    },
    update() {
      // Calculate vector length for the direction.
      const len = Math.sqrt(this.dx ** 2 + this.dy ** 2);
      // Move to the direction using the normalized values.
      this.y += (this.dy / len) * this.speed;
      this.x += (this.dx / len) * this.speed;

      if (this.y >= canvas.height - this.radius) {
        // Bottom of the screen.
        this.dy = -this.dy;
        this.y = canvas.height - this.radius;
      }
      if (this.y <= this.radius) {
        // Top of the screen.
        this.dy = -this.dy;
        this.y = this.radius;
      }
      if (this.x >= canvas.width - this.radius) {
        // Right of the screen.
        this.dx = -this.dx;
        this.x = canvas.width - this.radius;
      }
      if (this.x <= this.radius) {
        // Left of the screen.
        this.dx = -this.dx;
        this.x = this.radius;
      }
    },
  };

  const draw = () => {
    ball.update(); // Move the ball.

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the screen each frame.

    ball.draw(); // Draw the ball.

    // Next frame while the game is running.
    if (isRunning) window.requestAnimationFrame(draw);
  };
  draw(); // Start the game loop.
})();
