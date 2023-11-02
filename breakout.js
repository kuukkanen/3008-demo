(function () {
  // Create canvas for the game.
  const canvas = document.createElement("canvas");

  // Reasonable size.
  canvas.width = 640;
  canvas.height = 480;
  canvas.style.borderRadius = "10px";
  canvas.style.boxShadow = "10px 10px 10px rgba(0,0,0,0.5)";

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

  let score = 0;
  let hasWon = false;

  const paddle = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 100,
    height: 20,
    roundness: 5,
    draw() {
      // Create gradient for the paddle.
      const gradient = ctx.createLinearGradient(
        this.x,
        this.top,
        this.x,
        this.bottom,
      );
      gradient.addColorStop(0, "plum");
      gradient.addColorStop(1, "darkslateblue");
      ctx.fillStyle = gradient;

      ctx.beginPath();
      ctx.roundRect(
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height,
        this.roundness,
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
    move(x) {
      // Move the paddle and clamp to screen edges.
      paddle.x = Math.max(
        paddle.width / 2,
        Math.min(x, canvas.width - paddle.width / 2),
      );
    },
  };

  function Brick(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 20;
    this.roundness = 5;
    this.color = color;
  }

  Brick.prototype = {
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

  const bricks = [];

  bricks.draw = function () {
    this.forEach((brick) => {
      ctx.fillStyle = brick.color;
      ctx.beginPath();
      ctx.roundRect(
        brick.x - brick.width / 2,
        brick.y - brick.height / 2,
        brick.width,
        brick.height,
        brick.roundness,
      );
      ctx.fill();
    });
  };

  // Generate new bricks.
  bricks.generate = function () {
    bricks.splice(0, bricks.length);

    const horBricks = 5; // Bricks in the X-axis.
    const verBricks = 4; // Bricks in the Y-axis.
    const colors = ["salmon", "lawngreen", "deepskyblue", "khaki"]; // Colors for the bricks on the Y-axis.

    for (let y = 0; y < verBricks; y++) {
      for (let x = 0; x < horBricks; x++) {
        bricks.push(
          new Brick(
            (x * canvas.width) / horBricks + (canvas.width / horBricks) * 0.5,
            y * 20 * 2 + 20 * 3,
            colors[y],
          ),
        );
      }
    }
  };
  bricks.generate();

  const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 1,
    dy: -1,
    speed: 300,
    ghosts: [],
    maxGhosts: 10,
    prevTime: new Date(),
    paused: true,
    draw() {
      // Draw ghost images.
      for (const ghost of this.ghosts) {
        ctx.fillStyle = "palevioletred";
        ctx.globalAlpha = ghost.time / 0.1; // Fade the older ones.
        ctx.beginPath();
        ctx.ellipse(
          ghost.x,
          ghost.y,
          this.radius,
          this.radius,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }

      // Draw the white ball.
      ctx.fillStyle = "white";
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, Math.PI * 2);
      ctx.fill();
    },
    reset() {
      // Reset the game.
      this.paused = true;
      this.moveToPaddle();
      this.dy = -1;
    },
    update() {
      const curTime = new Date();
      const dt = (curTime - this.prevTime) / 1000; // Calculate deltatime.
      this.prevTime = curTime;

      this.ghosts = this.ghosts
        // Reduce time by deltatime for each ghost.
        .map((ghost) => ({ ...ghost, time: ghost.time - dt }))
        // Remove ghosts that have lived long enough.
        .filter(({ time }) => time > 0.0);
      // Add ghost image before moving.
      this.ghosts.push({ x: this.x, y: this.y, time: 0.1 });

      // Don't update when paused.
      if (this.paused) return;

      // Calculate vector length for the direction.
      const len = Math.sqrt(this.dx ** 2 + this.dy ** 2);
      // Move to the direction using the normalized values.
      this.y += (this.dy / len) * this.speed * dt;
      this.x += (this.dx / len) * this.speed * dt;

      // Collision to the screen edges.
      if (this.bottom >= canvas.height) {
        // Bottom of the screen.
        this.reset();
        bricks.generate(); // Start a new game.
        score = 0; // Reset the score.
      } else if (this.top <= 0) {
        // Top of the screen.
        this.dy = -this.dy;
        this.y = this.radius;
      } else if (this.right >= canvas.width) {
        // Right of the screen.
        this.dx = -this.dx;
        this.x = canvas.width - this.radius;
      } else if (this.left <= 0) {
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

      // Collide to the bricks.
      bricks.forEach((brick, i) => {
        switch (this.blockCollision(brick)) {
          case 1: // Top.
            this.dy = -this.dy;
            this.y = brick.top - this.radius;
            break;
          case 2: // Right.
            this.dx = -this.dx;
            this.x = brick.right + this.radius;
            break;
          case 3: // Bottom.
            this.dy = -this.dy;
            this.y = brick.bottom + this.radius;
            break;
          case 4: // Left.
            this.dx = -this.dx;
            this.x = brick.left - this.radius;
            break;
          default:
            return;
        }
        bricks.splice(i, 1);
        score += 100; // Got a point.
      });

      if (bricks.length === 0) hasWon = true;
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
            return 4; // Left.
          }
          if (this.x >= block.x) {
            return 2; // Right.
          }
        }
        if (this.x >= block.left && this.x <= block.right) {
          // Y-axis.
          if (this.y <= block.y) {
            return 1; // Top.
          }
          if (this.y >= block.y) {
            return 3; // Bottom.
          }
        }
      }

      // No collision.
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
    moveToPaddle() {
      // Move the ball to the paddle's position.
      this.x = paddle.x;
      this.y = paddle.top - this.radius;
    },
  };

  ball.moveToPaddle();

  canvas.addEventListener("mousemove", ({ offsetX }) => {
    // Move the paddle with the mouse.
    if (!hasWon) paddle.move(offsetX);
    // Move ball to the paddle when paused.
    if (ball.paused) ball.moveToPaddle();
  });

  canvas.addEventListener("mouseup", () => {
    if (ball.paused) {
      // Start moving the ball to the center of the screen.
      ball.dx = ball.x >= canvas.width / 2 ? -1 : 1;
      ball.paused = false;
    }
  });

  const draw = () => {
    if (!hasWon) ball.update(); // Move the ball.

    ctx.fillStyle = "#101046";
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear the screen each frame.

    ball.draw(); // Draw the ball.
    bricks.draw(); // Draw all bricks.
    paddle.draw(); // Draw the paddle.

    ctx.fillStyle = "white";
    ctx.font = "900 20px monospace";
    ctx.fillText(`Score: ${String(score).padStart(4, "0")}`, 10, 25);

    // Win statement text.
    if (hasWon) {
      ctx.font = "900 70px sans-serif";
      const wonText = "You Won!!!";
      const x = (640 - ctx.measureText(wonText).width) / 2;
      const y = 200;
      ctx.fillText(wonText, x, y);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.strokeText(wonText, x, y);
    }

    // Next frame while the game is running.
    if (isRunning) window.requestAnimationFrame(draw);
  };
  draw(); // Start the game loop.
})();
