(function () {
  madeby.textContent = "Jarkko Kuukkanen"; // eslint-disable-line

  // Create the board that will hold the squares.
  const board = document.createElement("div");
  board.style.display = "inline-grid";
  board.style.border = "2px solid black";
  // 3x3 grid.
  board.style.gridTemplateColumns = "repeat(3, 1fr)";
  board.style.gridTemplateRows = "repeat(3, 1fr)";
  content.appendChild(board); // eslint-disable-line

  let isPlayer2Turn = false;
  let hasWon = false;

  const boardValues = Array.from({ length: 3 }, () => new Array(3).fill(""));

  function checkBoard() {
    // Check rows.
    for (let y = 0; y < 3; y++) {
      // Get the first value in the row.
      let prevValue = boardValues[y][0];
      // Don't check empty values.
      if (prevValue !== "") {
        for (let x = 1; x < 3; x++) {
          const currentValue = boardValues[y][x];
          // This is not a winning row if the values don't match.
          if (currentValue !== prevValue) break;
          prevValue = currentValue;
          // We reached the end.
          if (x === 2) {
            hasWon = true;
            return;
          }
        }
      }
    }

    // Check columns.
    for (let x = 0; x < 3; x++) {
      // Get the first value in the column.
      let prevValue = boardValues[0][x];
      // Don't check empty values.
      if (prevValue !== "") {
        for (let y = 1; y < 3; y++) {
          const currentValue = boardValues[y][x];
          // This is not a winning column if the values don't match.
          if (currentValue !== prevValue) break;
          prevValue = currentValue;
          // We reached the end.
          if (y === 2) {
            hasWon = true;
            return;
          }
        }
      }
    }
  }

  function onClick(x, y, square) {
    // Don't allow clicking when the game has been won.
    if (hasWon) return;

    // The square has no symbol yet.
    if (!square.innerText) {
      // Set the symbol.
      boardValues[y][x] = isPlayer2Turn ? "x" : "o";
      square.innerText = boardValues[y][x];
      // Switch turns.
      isPlayer2Turn = !isPlayer2Turn;
      // Check the board after each turn.
      checkBoard();
    }
  }

  // Column.
  for (let y = 0; y < 3; y++) {
    // Row.
    for (let x = 0; x < 3; x++) {
      const square = document.createElement("button");
      // Reset button styling.
      square.style.backgroundColor = "transparent";
      square.style.border = "2px solid black";
      square.style.borderRadius = "0";
      square.style.margin = "0";
      square.style.padding = "0";
      square.style.width = "100px";
      square.style.height = "100px";
      square.style.fontSize = "3rem";
      // When this square is clicked.
      square.onclick = () => onClick(x, y, square);
      // Add the square to the board.
      board.appendChild(square);
    }
  }
})();
