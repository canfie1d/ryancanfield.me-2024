import { test, expect } from "@playwright/test";
import { assertSanityContentLoaded } from "./fixtures";

test.describe("Journey to Eryndor", () => {
  test.describe.serial("requires Sanity content", () => {
    test("Sanity content is loading", async ({ page }) => {
      await assertSanityContentLoaded(page);
    });

    test("journey-to-eryndor page loads", async ({ page }) => {
      await page.goto("/journey-to-eryndor");
      await expect(page).toHaveURL("/journey-to-eryndor");
      await expect(page).toHaveTitle(/Ryan Canfield/);
    });
  });
});
