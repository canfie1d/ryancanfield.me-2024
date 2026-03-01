import { test, expect } from "@playwright/test";
import { assertSanityContentLoaded, waitForAnimations } from "./fixtures";

test.describe("Navigation", () => {
  test.describe.serial("requires Sanity content", () => {
    test("Sanity content is loading", async ({ page }) => {
      await assertSanityContentLoaded(page);
    });

    test("home page loads and displays page previews", async ({ page }) => {
      await page.goto("/");
      await expect(page).toHaveTitle(/Ryan Canfield/);
      await expect(page.locator('a[href="/about"]')).toBeVisible({ timeout: 10000 });
      await waitForAnimations(page);
      await expect(page.locator('a[href="/work"]')).toBeVisible();
      await expect(page.locator('a[href="/writing"]')).toBeVisible();
      await expect(page.locator('a[href="/contact"]')).toBeVisible();
    });

    test("navigates to about page", async ({ page }) => {
      await page.goto("/");
      await waitForAnimations(page);
      await page.locator('a[href="/about"]').first().click();
      await expect(page).toHaveURL(/\/about/);
      await expect(page).toHaveTitle(/Ryan Canfield/);
    });

    test("navigates to work page", async ({ page }) => {
      await page.goto("/");
      await waitForAnimations(page);
      await page.locator('a[href="/work"]').first().click();
      await expect(page).toHaveURL(/\/work/);
    });

    test("navigates to writing page", async ({ page }) => {
      await page.goto("/");
      await waitForAnimations(page);
      await page.locator('a[href="/writing"]').first().click();
      await expect(page).toHaveURL(/\/writing/);
    });

    test("navigates to contact page", async ({ page }) => {
      await page.goto("/");
      await waitForAnimations(page);
      await page.locator('a[href="/contact"]').first().click();
      await expect(page).toHaveURL(/\/contact/);
    });

    test("direct navigation to about page", async ({ page }) => {
      await page.goto("/about");
      await expect(page).toHaveURL("/about");
    });

    test("direct navigation to work page", async ({ page }) => {
      await page.goto("/work");
      await expect(page).toHaveURL("/work");
    });

    test("direct navigation to writing page", async ({ page }) => {
      await page.goto("/writing");
      await expect(page).toHaveURL("/writing");
    });

    test("direct navigation to contact page", async ({ page }) => {
      await page.goto("/contact");
      await expect(page).toHaveURL("/contact");
    });
  });
});
