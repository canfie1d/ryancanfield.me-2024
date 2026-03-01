import { test, expect } from "@playwright/test";
import { assertSanityContentLoaded, seedUserWithInventoryAccess, waitForAnimations } from "./fixtures";

test.describe("Theme modal", () => {
  test.describe.serial("requires Sanity content", () => {
    test("Sanity content is loading", async ({ page }) => {
      await assertSanityContentLoaded(page);
    });

    test("opens when themes icon is clicked", async ({ page }) => {
      await page.goto("/about");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const themesButton = page.getByRole("button", { name: /theme/i });
      await themesButton.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible({ timeout: 5000 });
      await expect(dialog).toHaveAttribute("aria-modal", "true");
    });

    test("closes when close button is clicked", async ({ page }) => {
      await page.goto("/about");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const themesButton = page.getByRole("button", { name: /theme/i });
      await themesButton.click();
      await expect(page.getByRole("dialog")).toBeVisible({ timeout: 5000 });
      const closeButton = page.getByRole("button", { name: /close/i });
      await closeButton.click();
      await expect(page.getByRole("dialog")).not.toBeVisible();
    });

    test("closes when Escape key is pressed", async ({ page }) => {
      await page.goto("/about");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const themesButton = page.getByRole("button", { name: /theme/i });
      await themesButton.click();
      await expect(page.getByRole("dialog")).toBeVisible({ timeout: 5000 });
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).not.toBeVisible();
    });

    test("closes when backdrop is clicked", async ({ page }) => {
      await page.goto("/about");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const themesButton = page.getByRole("button", { name: /theme/i });
      await themesButton.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible({ timeout: 5000 });
      await page.locator('[class*="modalBackdrop"]').click({ position: { x: 5, y: 5 } });
      await expect(dialog).not.toBeVisible();
    });

    test("theme modal content is visible and interactive", async ({ page }) => {
      await page.goto("/about");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const themesButton = page.getByRole("button", { name: /theme/i });
      await themesButton.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible({ timeout: 5000 });
      const interactiveElements = dialog.locator("button, [role='button'], input");
      await expect(interactiveElements.first()).toBeVisible({ timeout: 5000 });
    });
  });
});

test.describe("Inventory modal", () => {
  test.beforeEach(async ({ page }) => {
    await seedUserWithInventoryAccess(page);
  });

  test.describe.serial("requires Sanity content", () => {
    test("Sanity content is loading", async ({ page }) => {
      await assertSanityContentLoaded(page);
    });

    test("opens when backpack icon is clicked", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator('a[href="/about"]')).toBeVisible({ timeout: 10000 });
      await waitForAnimations(page);
      const inventoryButton = page.getByRole("button", { name: /inventory/i });
      await inventoryButton.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible({ timeout: 5000 });
    });

    test("shows empty state or items and can be closed", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator('a[href="/about"]')).toBeVisible({ timeout: 10000 });
      await waitForAnimations(page);
      const inventoryButton = page.getByRole("button", { name: /inventory/i });
      await inventoryButton.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible({ timeout: 5000 });
      await expect(
        dialog.locator("[class*='empty'], [class*='itemGrid'], [class*='emptyState']")
      ).toBeVisible({ timeout: 5000 });
      const closeButton = page.getByRole("button", { name: /close/i });
      await closeButton.click();
      await expect(dialog).not.toBeVisible();
    });
  });
});

test.describe("Settings modal", () => {
  test.beforeEach(async ({ page }) => {
    await seedUserWithInventoryAccess(page);
  });

  test.describe.serial("requires Sanity content", () => {
    test("Sanity content is loading", async ({ page }) => {
      await assertSanityContentLoaded(page);
    });

    test("opens when settings icon is clicked", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator('a[href="/about"]')).toBeVisible({ timeout: 10000 });
      await waitForAnimations(page);
      const settingsButton = page.getByRole("button", { name: /setting/i });
      await settingsButton.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible({ timeout: 5000 });
    });

    test("is visible, interactive, and can be closed", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator('a[href="/about"]')).toBeVisible({ timeout: 10000 });
      await waitForAnimations(page);
      const settingsButton = page.getByRole("button", { name: /setting/i });
      await settingsButton.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible({ timeout: 5000 });
      const interactiveElements = dialog.locator("button, [role='switch'], input");
      await expect(interactiveElements.first()).toBeVisible({ timeout: 5000 });
      const closeButton = page.getByRole("button", { name: /close/i });
      await closeButton.click();
      await expect(dialog).not.toBeVisible();
    });
  });
});
