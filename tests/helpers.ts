import path from "node:path";
import { pathToFileURL } from "node:url";
import { expect, type Page } from "@playwright/test";

export const appUrl = pathToFileURL(path.resolve(__dirname, "../index.html")).href;

export const WIN_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const openGame = async (page: Page) => {
  await page.goto(appUrl);
};

export const square = (page: Page, index: number) =>
  page.locator(".square").nth(index);

export const message = (page: Page) => page.locator("#message");

export const play = async (page: Page, ...indexes: number[]) => {
  for (const index of indexes) {
    await square(page, index).click();
  }
};

// The board as nine strings, "" for an empty square.
export const boardText = async (page: Page) =>
  page.locator(".square").allTextContents();

// Makes the computer's random choices predictable. The computer picks
// empty[floor(random * empty.length)], so 0 means "the first empty square"
// and 0.99 means "the last empty square".
export const pinRandom = async (page: Page, value: number) => {
  await page.evaluate((v) => {
    Math.random = () => v;
  }, value);
};

export const chooseHumanVsComputer = async (
  page: Page,
  options: { hard?: boolean; asO?: boolean } = {},
) => {
  await page.getByRole("button", { name: "Human vs Computer" }).click();
  if (options.hard) await page.getByRole("button", { name: "Hard" }).click();
  if (options.asO) await page.getByRole("button", { name: "Play as O" }).click();
};

// Waits for the computer's 500ms "thinking" pause to finish.
export const waitForYourTurn = async (page: Page, player = "X") => {
  await expect(message(page)).toHaveText(`${player}'s turn!`);
};
