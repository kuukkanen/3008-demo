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

  const paddle = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 100,
    height: 20,
    draw() {
      ctx.fillStyle = "lightgray";
      ctx.beginPath();
      ctx.rect(
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height,
      );
      ctx.fill();
    },
    get top() {
      return this.y - this.height / 2;
    },
    get bottom() {
      return this.y + this.height / 2;
    },
    get left() {
      return this.x - this.width / 2;
    },
    get right() {
      return this.x + this.width / 2;
    },
  };

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
    reset() {
      // Reset the game.
      this.dy = 1;
      this.dx = 1;
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
    },
    update() {
      // Calculate vector length for the direction.
      const len = Math.sqrt(this.dx ** 2 + this.dy ** 2);
      // Move to the direction using the normalized values.
      this.y += (this.dy / len) * this.speed;
      this.x += (this.dx / len) * this.speed;

      // Collision to the screen edges.
      if (this.bottom >= canvas.height) {
        // Bottom of the screen.
        this.reset();
      }
      if (this.top <= 0) {
        // Top of the screen.
        this.dy = -this.dy;
        this.y = this.radius;
      }
      if (this.right >= canvas.width) {
        // Right of the screen.
        this.dx = -this.dx;
        this.x = canvas.width - this.radius;
      }
      if (this.left <= 0) {
        // Left of the screen.
        this.dx = -this.dx;
        this.x = this.radius;
      }

      // Collision to the paddle.
      switch (this.blockCollision(paddle)) {
        case 1: // Top.
          this.dy = -this.dy;
          this.y = paddle.top - this.radius;
          break;
        case 2: // Right.
          this.dx = -this.dx;
          this.x = paddle.right + this.radius;
          break;
        case 3: // Bottom.
          this.dy = -this.dy;
          this.y = paddle.bottom + this.radius;
          break;
        case 4: // Left.
          this.dx = -this.dx;
          this.x = paddle.left - this.radius;
          break;
      }
    },
    // Collision with a block.
    blockCollision(block) {
      let x = this.x;
      if (this.x < block.left) {
        x = block.left; // Left edge of the block.
      } else if (this.x > block.right) {
        x = block.right; // Right edge of the block.
      }

      let y = this.y;
      if (this.y < block.top) {
        y = block.top; // Top edge of the block.
      } else if (this.y > block.bottom) {
        y = block.bottom; // Bottom edge of the block.
      }

      // Get the distance from the ball to the block.
      const dist = Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2);
      if (dist <= this.radius) {
        // Collision detected, check the side.
        if (this.y >= block.top && this.y <= block.bottom) {
          // X-axis.
          if (this.x <= block.x) {
            return 4;
          }
          if (this.x >= block.x) {
            return 2;
          }
        }
        if (this.x >= block.left && this.x <= block.right) {
          // Y-axis.
          if (this.y <= block.y) {
            return 1;
          }
          if (this.y >= block.y) {
            return 3;
          }
        }
      }

      return 0;
    },
    get top() {
      return this.y - this.radius;
    },
    get bottom() {
      return this.y + this.radius;
    },
    get left() {
      return this.x - this.radius;
    },
    get right() {
      return this.x + this.radius;
    },
  };

  canvas.addEventListener("mousemove", ({ offsetX }) => {
    // Move the paddle with the mouse and clamp to screen edges.
    paddle.x = Math.max(
      paddle.width / 2,
      Math.min(offsetX, canvas.width - paddle.width / 2),
    );
  });

  const draw = () => {
    ball.update(); // Move the ball.

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the screen each frame.

    ball.draw(); // Draw the ball.
    paddle.draw(); // Draw the paddle.

    // Next frame while the game is running.
    if (isRunning) window.requestAnimationFrame(draw);
  };
  draw(); // Start the game loop.
})();
