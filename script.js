// All possible winning index combinations on a 3x3 board
// 8 lines total: 3 rows, 3 columns, 2 diagonals
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

// Game state - source of truth, not the DOM
let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

// Mode state - set by the sidebar controls
let gameMode = "humanVsHuman";
let difficulty = "easy";
let humanMarker = "X";
let computerMarker = "O";

// DOM references
const messageBox = document.querySelector("#message");
const resetButton = document.querySelector(".reset-button");
const squares = document.querySelectorAll(".square");
const btnHumanVsHuman = document.querySelector("#btn-hvh");
const btnHumanVsComputer = document.querySelector("#btn-hvc");
const btnEasy = document.querySelector("#btn-easy");
const btnHard = document.querySelector("#btn-hard");
const btnPlayAsX = document.querySelector("#btn-x");
const btnPlayAsO = document.querySelector("#btn-o");
const difficultyControls = document.querySelector("#difficulty-controls");

// Updates the status message text and colour based on the game state type
// Colours chosen to pass WCAG 2.2 AA contrast on the pink background
const updateMessage = (type) => {
  switch (type) {
    case "turn":
      messageBox.textContent = `${currentPlayer}'s turn!`;
      messageBox.style.color = "#4169e1";
      break;
    case "taken":
      // Shown when a player clicks an already-occupied square
      messageBox.textContent = `Already taken - choose another square for ${currentPlayer}`;
      messageBox.style.color = "#CC0000";
      break;
    case "win":
      messageBox.textContent = `${currentPlayer} wins!`;
      messageBox.style.color = "#008000";
      break;
    case "computer-win":
      // Separate case so we can say "Computer wins!" rather than "O wins!"
      messageBox.textContent = `Computer wins!`;
      messageBox.style.color = "#008000";
      break;
    case "draw":
      messageBox.textContent = "It's a draw!";
      // #7B6000 is dark enough to pass contrast on the pink background
      messageBox.style.color = "#7B6000";
      break;
    case "thinking":
      // Shown during the 500ms delay before the computer takes its turn
      messageBox.textContent = `Computer is thinking...`;
      messageBox.style.color = "#4169e1";
      break;
  }
};

// Returns the winning triplet of indices if one exists, otherwise undefined
// Used both to detect a win and to identify which squares to highlight
const getWinningLine = () => {
  return WIN_COMBINATIONS.find(
    ([a, b, c]) =>
      board[a] !== "" && board[a] === board[b] && board[a] === board[c],
  );
};

// Easy mode: picks a random empty square index
const getRandomMove = () => {
  const emptySquares = board
    .map((cell, index) => (cell === "" ? index : null))
    .filter((index) => index !== null);
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
};

// Returns the index of a winning move for the given marker if one exists
// Used by getSmartMove to check both winning and blocking opportunities
const getWinningMove = (marker) => {
  for (const [a, b, c] of WIN_COMBINATIONS) {
    const line = [board[a], board[b], board[c]];
    const indices = [a, b, c];
    const markerCount = line.filter((cell) => cell === marker).length;
    const emptyCount = line.filter((cell) => cell === "").length;
    if (markerCount === 2 && emptyCount === 1) {
      return indices[line.indexOf("")];
    }
  }
  return null;
};

// Hard mode: priority order is win, then block, then random
// This makes the computer competitive without being unbeatable
const getSmartMove = () => {
  const winMove = getWinningMove(computerMarker);
  if (winMove !== null) return winMove;

  const blockMove = getWinningMove(humanMarker);
  if (blockMove !== null) return blockMove;

  return getRandomMove();
};

// Routes to the correct move function based on current difficulty setting
const getComputerMove = () => {
  return difficulty === "hard" ? getSmartMove() : getRandomMove();
};

// Writes a move to the board array and updates the matching square in the DOM
const applyMove = (index, marker) => {
  board[index] = marker;
  squares[index].textContent = marker;
};

// Handles end of game state - highlights squares and shows the result message
const endGame = (type) => {
  if (type === "win") {
    const winningLine = getWinningLine();
    // Add green highlight to the three winning squares
    winningLine.forEach((i) => squares[i].classList.add("square--winner"));
    messageBox.classList.add("winner");
    const isComputerWin =
      gameMode === "humanVsComputer" && currentPlayer === computerMarker;
    updateMessage(isComputerWin ? "computer-win" : "win");
  } else {
    // Draw: highlight all squares in brown
    squares.forEach((square) => square.classList.add("square--draw"));
    messageBox.classList.add("winner");
    updateMessage("draw");
  }
  gameOver = true;
};

// Triggers the computer's move after a 500ms delay
// The delay makes it feel like the computer is thinking rather than instant
const takeComputerTurn = () => {
  updateMessage("thinking");
  setTimeout(() => {
    // Guard against the player resetting mid-delay
    if (gameOver) return;
    const move = getComputerMove();
    currentPlayer = computerMarker;
    applyMove(move, computerMarker);

    if (getWinningLine()) {
      endGame("win");
      return;
    }
    if (board.every((cell) => cell !== "")) {
      endGame("draw");
      return;
    }
    // Computer's turn is done - hand back to the human
    currentPlayer = humanMarker;
    updateMessage("turn");
  }, 500);
};

// Main click handler - runs on every square click
const handleSquareClick = (index) => {
  // Ignore all clicks once the game is over
  if (gameOver) return;

  // Ignore clicks while the computer is taking its turn
  if (gameMode === "humanVsComputer" && currentPlayer === computerMarker)
    return;

  // Ignore clicks on squares that are already filled
  if (board[index] !== "") {
    updateMessage("taken");
    return;
  }

  // In human vs computer mode, the human always plays their chosen marker
  // In human vs human mode, currentPlayer tracks whose turn it is
  const markerToPlay =
    gameMode === "humanVsComputer" ? humanMarker : currentPlayer;
  applyMove(index, markerToPlay);

  if (getWinningLine()) {
    endGame("win");
    return;
  }
  if (board.every((cell) => cell !== "")) {
    endGame("draw");
    return;
  }

  if (gameMode === "humanVsComputer") {
    currentPlayer = computerMarker;
    takeComputerTurn();
  } else {
    // Human vs human: toggle between X and O
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateMessage("turn");
  }
};

// Attach a click handler to each square, passing its index to handleSquareClick
squares.forEach((square, index) => {
  square.addEventListener("click", () => handleSquareClick(index));
});

// Resets all game state and DOM back to a fresh start
// Also triggers the computer's first move if the human is playing as O
const resetGame = () => {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;

  squares.forEach((square) => {
    square.textContent = "";
    square.classList.remove("square--winner", "square--draw");
  });

  messageBox.classList.remove("winner");
  updateMessage("turn");

  // If the human chose O, X goes first so the computer takes the opening move
  if (gameMode === "humanVsComputer" && humanMarker === "O") {
    currentPlayer = computerMarker;
    takeComputerTurn();
  }
};

resetButton.addEventListener("click", resetGame);

// Mode toggle: switches between human vs human and human vs computer
// Showing or hiding the difficulty and marker controls accordingly
btnHumanVsHuman.addEventListener("click", () => {
  gameMode = "humanVsHuman";
  btnHumanVsHuman.classList.add("mode-btn--active");
  btnHumanVsComputer.classList.remove("mode-btn--active");
  difficultyControls.classList.add("hidden");
  resetGame();
});

btnHumanVsComputer.addEventListener("click", () => {
  gameMode = "humanVsComputer";
  btnHumanVsComputer.classList.add("mode-btn--active");
  btnHumanVsHuman.classList.remove("mode-btn--active");
  difficultyControls.classList.remove("hidden");
  resetGame();
});

// Difficulty toggle: easy picks randomly, hard wins or blocks first
btnEasy.addEventListener("click", () => {
  difficulty = "easy";
  btnEasy.classList.add("mode-btn--active");
  btnHard.classList.remove("mode-btn--active");
  resetGame();
});

btnHard.addEventListener("click", () => {
  difficulty = "hard";
  btnHard.classList.add("mode-btn--active");
  btnEasy.classList.remove("mode-btn--active");
  resetGame();
});

// Marker toggle: sets which marker the human plays and derives the computer's marker
btnPlayAsX.addEventListener("click", () => {
  humanMarker = "X";
  computerMarker = "O";
  btnPlayAsX.classList.add("mode-btn--active");
  btnPlayAsO.classList.remove("mode-btn--active");
  resetGame();
});

btnPlayAsO.addEventListener("click", () => {
  humanMarker = "O";
  computerMarker = "X";
  btnPlayAsO.classList.add("mode-btn--active");
  btnPlayAsX.classList.remove("mode-btn--active");
  resetGame();
});

// Set the initial turn message when the page first loads
updateMessage("turn");
