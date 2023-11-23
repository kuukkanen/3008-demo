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
    for (let i = 0; i < 3; i++) {
      let rowSameSymbols = 1;
      let colSameSymbols = 1;
      for (let j = 1; j < 3; j++) {
        // Count the amount of symbols that match the first symbol of the row/column.
        if (boardValues[i][j] === boardValues[i][0]) rowSameSymbols++;
        if (boardValues[j][i] === boardValues[0][i]) colSameSymbols++;
      }

      // All are the same symbols so we won.
      if (boardValues[i][0] !== "" && rowSameSymbols === 3) hasWon = true;
      if (boardValues[0][i] !== "" && colSameSymbols === 3) hasWon = true;
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
