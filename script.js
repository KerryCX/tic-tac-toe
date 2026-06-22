let counter = "O";
let numberOfPlays = 0;

// All possible winning index combinations on a 3x3 board
const WIN_COMBINATIONS = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6],
];

// Game state. Source of truth, not the DOM
let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

// DOM references
const messageBox = document.querySelector("#message");
const resetButton = document.querySelector(".reset-button");
const squares = document.querySelectorAll(".square");

// Updates the status message and its colour based on game state
const updateMessage = (type) => {
  switch (type) {
    case "turn":
      messageBox.textContent = `${currentPlayer}'s turn!`;
      messageBox.style.color = "#4169e1";
      break;
    case "taken":
      messageBox.textContent = `Already taken. Choose another square for ${currentPlayer}`;
      messageBox.style.color = "#FF0000";
      break;
    case "win":
      messageBox.textContent = `${currentPlayer} wins!`;
      messageBox.style.color = "#008000";
      break;
    case "draw":
      messageBox.textContent = "It's a draw!";
      messageBox.style.color = "#FFBF00";
      break;
  }
};

// Returns the winning triplet of indices if one exists, otherwise undefined
const getWinningLine = () => {
  return WIN_COMBINATIONS.find(
    ([a, b, c]) =>
      board[a] !== "" && board[a] === board[b] && board[a] === board[c],
  );
};

// Handles all logic for a square being clicked
const handleSquareClick = (index) => {
  // Ignore clicks if the game is over
  if (gameOver) return;

  // Ignore clicks on already-filled squares and tell the player
  if (board[index] !== "") {
    updateMessage("taken");
    return;
  }

  // Update state and reflect it in the DOM
  board[index] = currentPlayer;
  squares[index].textContent = currentPlayer;

  const winningLine = getWinningLine();

  if (winningLine) {
    updateMessage("win");
    // Highlight the three winning squares via CSS class
    winningLine.forEach((i) => squares[i].classList.add("square--winner"));
    messageBox.classList.add("winner");
    gameOver = true;
    return;
  }

  // A draw is when all 9 squares are filled and no winner was found
  if (board.every((cell) => cell !== "")) {
    updateMessage("draw");
    // Highlight all squares to indicate a draw
    squares.forEach((square) => square.classList.add("square--draw"));
    messageBox.classList.add("winner");
    gameOver = true;
    return;
  }

  // No winner yet. Switch player and continue
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateMessage("turn");
};

// Attach click handler to each square using its index
squares.forEach((square, index) => {
  square.addEventListener("click", () => handleSquareClick(index));
});

// Resets all state and DOM back to the start of a new game
resetButton.addEventListener("click", () => {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;

  squares.forEach((square) => {
    square.textContent = "";
    square.classList.remove("square--winner", "square--draw");
  });

  messageBox.classList.remove("winner");

  updateMessage("turn");
});

// Set the initial message when the page loads
updateMessage("turn");
