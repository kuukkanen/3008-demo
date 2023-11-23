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

  function onClick(x, y, square) {
    // The square has no symbol yet.
    if (!square.innerText) {
      // Set the symbol.
      square.innerText = isPlayer2Turn ? "x" : "o";
      // Switch turns.
      isPlayer2Turn = !isPlayer2Turn;
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
