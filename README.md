# Tic Tac Toe

A browser-based Tic Tac Toe game built with vanilla HTML, CSS, and JavaScript.

## About

This started as an early project and has since been refactored to improve code quality:

- Game state is tracked in a `board` array rather than read back from the DOM
- Win detection uses a `WIN_COMBINATIONS` array instead of per-square conditional logic
- Fixed a bug where a middle row win was not detected if the centre square was the last move
- Replaced inline style manipulation with CSS classes
- Reset always returns to a consistent starting state

## How to play

Choose your mode before the game starts:

**Human vs Human** two players take turns on the same device. X goes first. The first player to get three in a row (across, down, or diagonally) wins.

**Human vs Computer** play against the computer. Choose your difficulty and whether to play as X or O:

- Easy - the computer picks randomly, like a parent who sometimes lets their child win
- Hard - the computer blocks your wins and takes its own, but occasionally loses focus

You can restart at any point using the Start Again button.

## Tech

- HTML
- CSS
- JavaScript (no frameworks)

## Live

[tictactoe.kerryclements.com](https://tictactoe.kerryclements.com)
