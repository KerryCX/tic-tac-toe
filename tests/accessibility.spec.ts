import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { chooseHumanVsComputer, message, openGame, play, square } from "./helpers";

// WCAG 2.2 AA is the target, with zero violations.
const scan = (page: Page) =>
  new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

// The win message flashes unless the visitor prefers reduced motion. Scan with
// that preference on so axe doesn't measure a half-faded colour.
const reduceMotion = (page: Page) => page.emulateMedia({ reducedMotion: "reduce" });

test("has no violations at the start", async ({ page }) => {
  await openGame(page);
  expect((await scan(page)).violations).toEqual([]);
});

test("has no violations in human vs computer mode", async ({ page }) => {
  await openGame(page);
  await chooseHumanVsComputer(page);
  expect((await scan(page)).violations).toEqual([]);
});

test("has no violations mid-game", async ({ page }) => {
  await openGame(page);
  await play(page, 0, 4);
  expect((await scan(page)).violations).toEqual([]);
});

test("has no violations after a win", async ({ page }) => {
  await openGame(page);
  await play(page, 0, 3, 1, 4, 2);
  await reduceMotion(page);
  expect((await scan(page)).violations).toEqual([]);
});

test("has no violations after a draw", async ({ page }) => {
  await openGame(page);
  await play(page, 0, 1, 2, 4, 3, 5, 7, 6, 8);
  await reduceMotion(page);
  expect((await scan(page)).violations).toEqual([]);
});

test("the status message is announced to screen readers", async ({ page }) => {
  await openGame(page);
  await expect(message(page)).toHaveAttribute("aria-live", "polite");
});

test("has a page title, language and a single h1", async ({ page }) => {
  await openGame(page);
  await expect(page).toHaveTitle(/.+/);
  await expect(page.locator("html")).toHaveAttribute("lang", /.+/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
});

test("the board has an accessible name", async ({ page }) => {
  await openGame(page);
  await expect(page.getByRole("region", { name: "Game board" })).toBeVisible();
});

test("each square has a name that says where it is and what is in it", async ({ page }) => {
  await openGame(page);
  await expect(square(page, 0)).toHaveAccessibleName("Row 1, column 1, empty");
  await expect(square(page, 5)).toHaveAccessibleName("Row 2, column 3, empty");
  await play(page, 4);
  await expect(square(page, 4)).toHaveAccessibleName("Row 2, column 2, X");
  await page.getByRole("button", { name: "Start Again" }).click();
  await expect(square(page, 4)).toHaveAccessibleName("Row 2, column 2, empty");
});

test("the squares are buttons in the tab order", async ({ page }) => {
  await openGame(page);
  await expect(page.getByRole("button", { name: /^Row \d, column \d, / })).toHaveCount(9);
});

test("the board can be played with the keyboard alone", async ({ page }) => {
  await openGame(page);
  await square(page, 0).focus();
  await page.keyboard.press("Enter");
  await expect(square(page, 0)).toHaveText("X");

  await square(page, 4).focus();
  await page.keyboard.press("Space");
  await expect(square(page, 4)).toHaveText("O");
});

test("a keyboard user can reach the board by tabbing", async ({ page }) => {
  await openGame(page);
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    if (await square(page, 0).evaluate((el) => el === document.activeElement)) return;
  }
  throw new Error("The first square was not reached within six Tab presses");
});

test("every button shows a visible focus indicator", async ({ page }) => {
  await openGame(page);
  const buttons = [
    square(page, 0),
    page.getByRole("button", { name: "Human vs Computer" }),
    page.getByRole("button", { name: "Start Again" }),
  ];
  for (const button of buttons) {
    await button.focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await expect(button).toHaveCSS("outline-style", "solid");
    await expect(button).toHaveCSS("outline-width", "3px");
  }
});

test("the win message stops flashing after a few seconds", async ({ page }) => {
  await openGame(page);
  await play(page, 0, 3, 1, 4, 2);
  await expect(message(page)).toHaveCSS("animation-iteration-count", "2");
});

test("the win message does not animate when reduced motion is preferred", async ({ page }) => {
  await openGame(page);
  await reduceMotion(page);
  await play(page, 0, 3, 1, 4, 2);
  await expect(message(page)).toHaveCSS("animation-name", "none");
});
