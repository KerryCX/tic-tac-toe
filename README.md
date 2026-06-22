# Tic Tac Toe

A browser-based two-player Tic Tac Toe game built with vanilla HTML, CSS, and JavaScript.

## About

This started as an early project and has since been refactored to improve code quality:

- Game state is tracked in a `board` array rather than read back from the DOM
- Win detection uses a `WIN_COMBINATIONS` array instead of per-square conditional logic
- Fixed a bug where a middle row win was not detected if the centre square was the last move
- Replaced inline style manipulation with CSS classes
- Reset always returns to a consistent starting state

## How to play

Two players take turns on the same device. X goes first. The first player to get three in a row (across, down, or diagonally) wins. You can restart at any point using the Start Again button.

## Tech

- HTML
- CSS
- JavaScript (no frameworks)

## Live

[tictactoe.kerryclements.com](https://tictactoe.kerryclements.com)
