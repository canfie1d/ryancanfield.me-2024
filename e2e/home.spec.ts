import { test, expect } from "@playwright/test";
import { assertSanityContentLoaded } from "./fixtures";

test.describe("Home page", () => {
  test.describe.serial("requires Sanity content", () => {
    test("Sanity content is loading", async ({ page }) => {
      await assertSanityContentLoaded(page);
    });

    test("has correct meta and structure", async ({ page }) => {
      await page.goto("/");
      await expect(page).toHaveTitle(/Ryan Canfield/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        /Seattle-based software engineering leader/
      );
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
    });

    test("has favicon", async ({ page }) => {
      await page.goto("/");
      const favicon = page.locator('link[rel="icon"]');
      await expect(favicon).toHaveAttribute("href", /favicon\.png/);
    });
  });
});
