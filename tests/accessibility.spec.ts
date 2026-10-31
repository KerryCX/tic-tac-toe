import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { chooseHumanVsComputer, message, openGame, play, square } from "./helpers";

// WCAG 2.2 AA is the target, with zero violations.
const scan = (page: Page) =>
  new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

// The win message fades in and out forever (see the notes at the end of this
// file), so freeze it before scanning or axe measures a half-faded colour.
const freezeAnimations = (page: Page) =>
  page.addStyleTag({ content: "*{animation:none !important}" });

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
  await freezeAnimations(page);
  expect((await scan(page)).violations).toEqual([]);
});

test("has no violations after a draw", async ({ page }) => {
  await openGame(page);
  await play(page, 0, 1, 2, 4, 3, 5, 7, 6, 8);
  await freezeAnimations(page);
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

// Known gap (WCAG 2.1.1 Keyboard): the squares are plain divs with a click
// handler, so they can't be reached or played with the keyboard.
// Remove .fixme once the squares are buttons.
test.fixme("the board can be played with the keyboard alone", async ({ page }) => {
  await openGame(page);
  await square(page, 0).focus();
  await page.keyboard.press("Enter");
  await expect(square(page, 0)).toHaveText("X");
});
