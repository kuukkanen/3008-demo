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
  let whoWon = null;

  const boardValues = Array.from({ length: 3 }, () => new Array(3).fill(""));

  function checkBoard() {
    let diagonalSymbols = 0;
    let altDiagonalSymbols = 0;
    // Check rows and columns.
    for (let i = 0; i < 3; i++) {
      let rowSameSymbols = 1;
      let colSameSymbols = 1;
      for (let j = 1; j < 3; j++) {
        // Count the amount of symbols that match the first symbol of the row/column.
        if (boardValues[i][j] === boardValues[i][0]) rowSameSymbols++;
        if (boardValues[j][i] === boardValues[0][i]) colSameSymbols++;
      }

      // All are the same symbols so we won.
      if (boardValues[i][0] !== "" && rowSameSymbols === 3) {
        whoWon = boardValues[i][0];
        return;
      }
      if (boardValues[0][i] !== "" && colSameSymbols === 3) {
        whoWon = boardValues[0][i];
        return;
      }

      // Count the amount of symbols that match the first symbol of the diagonal line.
      if (boardValues[i][i] === boardValues[0][0]) diagonalSymbols++;
      if (boardValues[i][2 - i] === boardValues[0][2]) altDiagonalSymbols++;
    }
    // All are the same symbols so we won.
    if (boardValues[0][0] !== "" && diagonalSymbols === 3) {
      whoWon = boardValues[0][0];
      return;
    }
    if (boardValues[0][2] !== "" && altDiagonalSymbols === 3) {
      whoWon = boardValues[0][2];
      return;
    }

    // Check for a draw.
    loop: for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (boardValues[y][x] === "") break loop;
        // We reached the end so the board is filled and there is no winner.
        if (y === 2 && x === 2) {
          whoWon = "ox";
          return;
        }
      }
    }
  }

  function onClick(x, y, square) {
    // Don't allow clicking when the game has been won.
    if (whoWon) return;

    // The square has no symbol yet.
    if (!square.innerText) {
      // Set the symbol.
      boardValues[y][x] = isPlayer2Turn ? "x" : "o";
      square.innerText = boardValues[y][x];
      // Switch turns.
      isPlayer2Turn = !isPlayer2Turn;
      // Check the board after each turn.
      checkBoard();

      // Show who won the game.
      if (whoWon) {
        const wonText = document.createElement("div");
        wonText.innerText =
          whoWon === "ox"
            ? "It's a draw!"
            : `"${whoWon.toUpperCase()}" won the game!`;
        wonText.style.fontSize = "2rem";
        wonText.style.fontWeight = "bold";
        wonText.style.marginTop = "1rem";
        content.appendChild(wonText); // eslint-disable-line
      }
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
