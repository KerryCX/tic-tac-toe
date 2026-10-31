import { expect, test } from "@playwright/test";
import {
  WIN_COMBINATIONS,
  boardText,
  chooseHumanVsComputer,
  message,
  openGame,
  pinRandom,
  play,
  square,
  waitForYourTurn,
} from "./helpers";

const EMPTY_BOARD = Array(9).fill("");

test.describe("starting a game", () => {
  test("starts with an empty board and X to play", async ({ page }) => {
    await openGame(page);
    expect(await boardText(page)).toEqual(EMPTY_BOARD);
    await expect(message(page)).toHaveText("X's turn!");
    await expect(page.getByRole("button", { name: "Human vs Human" })).toHaveClass(/mode-btn--active/);
    await expect(page.locator("#difficulty-controls")).toBeHidden();
  });
});

test.describe("human vs human", () => {
  test("players take turns, X first", async ({ page }) => {
    await openGame(page);
    await play(page, 0);
    await expect(message(page)).toHaveText("O's turn!");
    await play(page, 4);
    await expect(message(page)).toHaveText("X's turn!");
    expect(await boardText(page)).toEqual(["X", "", "", "", "O", "", "", "", ""]);
  });

  test("a taken square is refused and the turn does not change", async ({ page }) => {
    await openGame(page);
    await play(page, 0, 0);
    await expect(message(page)).toHaveText(
      "Already taken - choose another square for O",
    );
    expect((await boardText(page))[0]).toBe("X");

    await play(page, 1);
    expect((await boardText(page))[1]).toBe("O");
  });

  // X takes the winning line while O plays two squares that can't win.
  for (const line of WIN_COMBINATIONS) {
    test(`X wins on ${line.join("-")}`, async ({ page }) => {
      await openGame(page);
      const others = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter((i) => !line.includes(i));
      await play(page, line[0], others[0], line[1], others[1], line[2]);

      await expect(message(page)).toHaveText("X wins!");
      for (const i of line) {
        await expect(square(page, i)).toHaveClass(/square--winner/);
      }
      await expect(page.locator(".square--winner")).toHaveCount(3);
    });
  }

  test("O can win too", async ({ page }) => {
    await openGame(page);
    // X: 0, 1, 8   O: 3, 4, 5 (O wins across the middle row)
    await play(page, 0, 3, 1, 4, 8, 5);
    await expect(message(page)).toHaveText("O wins!");
  });

  test("ignores clicks after the game is won", async ({ page }) => {
    await openGame(page);
    await play(page, 0, 3, 1, 4, 2);
    await play(page, 5, 6);
    expect(await boardText(page)).toEqual(["X", "X", "X", "O", "O", "", "", "", ""]);
  });

  test("a full board with no winner is a draw", async ({ page }) => {
    await openGame(page);
    // X O X
    // X O O
    // O X X
    await play(page, 0, 1, 2, 4, 3, 5, 7, 6, 8);
    await expect(message(page)).toHaveText("It's a draw!");
    await expect(page.locator(".square--draw")).toHaveCount(9);
    await expect(page.locator(".square--winner")).toHaveCount(0);
  });

  test("a win on the last square counts as a win, not a draw", async ({ page }) => {
    await openGame(page);
    // X O X
    // O X O
    // O X X   X wins on the diagonal 0-4-8 with the ninth move
    await play(page, 0, 1, 2, 3, 4, 5, 7, 6, 8);
    await expect(message(page)).toHaveText("X wins!");
    await expect(page.locator(".square--draw")).toHaveCount(0);
  });
});

test.describe("starting again", () => {
  test("clears the board, highlights and message", async ({ page }) => {
    await openGame(page);
    await play(page, 0, 3, 1, 4, 2);
    await page.getByRole("button", { name: "Start Again" }).click();

    expect(await boardText(page)).toEqual(EMPTY_BOARD);
    await expect(message(page)).toHaveText("X's turn!");
    await expect(page.locator(".square--winner")).toHaveCount(0);
    await expect(message(page)).not.toHaveClass(/winner/);
    await play(page, 4);
    expect((await boardText(page))[4]).toBe("X");
  });
});

test.describe("choosing a mode", () => {
  test("switching to human vs computer shows the options and restarts", async ({ page }) => {
    await openGame(page);
    await play(page, 0);
    await page.getByRole("button", { name: "Human vs Computer" }).click();

    await expect(page.locator("#difficulty-controls")).toBeVisible();
    await expect(page.getByRole("button", { name: "Human vs Computer" })).toHaveClass(/mode-btn--active/);
    expect(await boardText(page)).toEqual(EMPTY_BOARD);
  });

  test("switching back to human vs human hides the options", async ({ page }) => {
    await openGame(page);
    await chooseHumanVsComputer(page);
    await page.getByRole("button", { name: "Human vs Human" }).click();
    await expect(page.locator("#difficulty-controls")).toBeHidden();
  });

  test("only one button in each pair is active", async ({ page }) => {
    await openGame(page);
    await chooseHumanVsComputer(page, { hard: true, asO: true });
    await expect(page.getByRole("button", { name: "Hard" })).toHaveClass(/mode-btn--active/);
    await expect(page.getByRole("button", { name: "Easy" })).not.toHaveClass(/mode-btn--active/);
    await expect(page.getByRole("button", { name: "Play as O" })).toHaveClass(/mode-btn--active/);
    await expect(page.getByRole("button", { name: "Play as X" })).not.toHaveClass(/mode-btn--active/);
  });
});

test.describe("human vs computer", () => {
  test("the computer replies after a short pause", async ({ page }) => {
    await openGame(page);
    await chooseHumanVsComputer(page);
    await pinRandom(page, 0);

    await play(page, 4);
    await expect(message(page)).toHaveText("Computer is thinking...");
    await waitForYourTurn(page);
    expect(await boardText(page)).toEqual(["O", "", "", "", "X", "", "", "", ""]);
  });

  test("clicks are ignored while the computer is thinking", async ({ page }) => {
    await openGame(page);
    await chooseHumanVsComputer(page);
    await pinRandom(page, 0);

    await play(page, 4, 8);
    await waitForYourTurn(page);
    expect((await boardText(page))[8]).toBe("");
  });

  test("playing as O, the computer opens as X", async ({ page }) => {
    await openGame(page);
    await pinRandom(page, 0);
    await chooseHumanVsComputer(page, { asO: true });
    await waitForYourTurn(page, "O");
    expect(await boardText(page)).toEqual(["X", "", "", "", "", "", "", "", ""]);
  });

  test("hard mode blocks a winning move", async ({ page }) => {
    await openGame(page);
    await chooseHumanVsComputer(page, { hard: true });
    await pinRandom(page, 0);

    await play(page, 0);
    await waitForYourTurn(page); // computer takes square 1
    await play(page, 3); // X threatens 0-3-6
    await waitForYourTurn(page);
    expect((await boardText(page))[6]).toBe("O");
  });

  test("hard mode takes a win in preference to blocking", async ({ page }) => {
    await openGame(page);
    await chooseHumanVsComputer(page, { hard: true });
    await pinRandom(page, 0.99);

    await play(page, 0);
    await waitForYourTurn(page); // computer plays the last empty square, 8
    await play(page, 1); // X threatens 0-1-2
    await waitForYourTurn(page); // computer blocks at 2, so O has 2 and 8
    await play(page, 3); // X threatens 6, but O can win at 5

    await expect(message(page)).toHaveText("Computer wins!");
    for (const i of [2, 5, 8]) {
      await expect(square(page, i)).toHaveClass(/square--winner/);
    }
  });

  test("a human win says X wins, not Computer wins", async ({ page }) => {
    await openGame(page);
    await chooseHumanVsComputer(page);
    await pinRandom(page, 0.99); // easy computer plays the last empty square

    await play(page, 0);
    await waitForYourTurn(page); // computer plays 8
    await play(page, 1);
    await waitForYourTurn(page); // computer plays 7
    await play(page, 2);
    await expect(message(page)).toHaveText("X wins!");
  });

  // Known bug: resetting during the computer's 500ms pause still lets a stale
  // computer move land on the new board. The guard in takeComputerTurn checks
  // gameOver, but resetGame has just set that back to false.
  test.fixme("resetting during the computer's pause does not leave a stray move", async ({ page }) => {
    await openGame(page);
    await chooseHumanVsComputer(page);
    await pinRandom(page, 0);

    await play(page, 4);
    await page.getByRole("button", { name: "Start Again" }).click();
    await page.waitForTimeout(800);
    expect(await boardText(page)).toEqual(EMPTY_BOARD);
  });
});
