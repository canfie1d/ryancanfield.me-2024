import { test, expect } from "@playwright/test";
import { assertSanityContentLoaded } from "./fixtures";

test.describe("Content loading", () => {
  test.describe.serial("requires Sanity content", () => {
    test("Sanity content is loading", async ({ page }) => {
      await assertSanityContentLoaded(page);
    });

    test("about page loads content from Sanity", async ({ page }) => {
      await page.goto("/about");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await expect(page.locator('[role="tablist"]')).toBeVisible();
    });

    test("work page loads content from Sanity", async ({ page }) => {
      await page.goto("/work");
      await expect(page.locator("main")).toBeVisible({ timeout: 15000 });
      await expect(page.locator(".contentBody, [class*='card'], [class*='project']")).toBeVisible({
        timeout: 15000,
      });
    });

    test("writing page loads content from Sanity", async ({ page }) => {
      await page.goto("/writing");
      await expect(page.locator("main")).toBeVisible({ timeout: 15000 });
      await expect(
        page.locator(".contentBody, [class*='article'], a[href*='http']")
      ).toBeVisible({ timeout: 15000 });
    });

    test("contact page loads and shows form", async ({ page }) => {
      await page.goto("/contact");
      await expect(page.locator("main")).toBeVisible({ timeout: 15000 });
      await expect(page.locator("form")).toBeVisible({ timeout: 10000 });
    });

    test("journey-to-eryndor page loads content", async ({ page }) => {
      await page.goto("/journey-to-eryndor");
      await expect(page.locator("main")).toBeVisible({ timeout: 15000 });
      await expect(page.locator(".contentBody, [class*='content']")).toBeVisible({
        timeout: 15000,
      });
    });
  });
});
