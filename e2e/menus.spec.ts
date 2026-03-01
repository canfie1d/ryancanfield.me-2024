import { test, expect } from "@playwright/test";
import { assertSanityContentLoaded, waitForAnimations } from "./fixtures";

test.describe("Color menu and color picker", () => {
  test.describe.serial("requires Sanity content", () => {
    test("Sanity content is loading", async ({ page }) => {
      await assertSanityContentLoaded(page);
    });

    test("color menu is visible on about page", async ({ page }) => {
      await page.goto("/about");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const colorLabel = page.locator("button").filter({ hasText: /^#[0-9a-fA-F]{6}$/ });
      await expect(colorLabel.first()).toBeVisible({ timeout: 5000 });
    });

    test("clicking color hex copies and shows toast", async ({ page }) => {
      await page.goto("/about");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const colorLabel = page.locator("button").filter({ hasText: /^#[0-9a-fA-F]{6}$/ }).first();
      await colorLabel.click();
      await expect(page.locator('[role="status"], [role="alert"], [class*="toast"]')).toBeVisible({
        timeout: 3000,
      });
    });

    test("eyedropper opens color picker", async ({ page }) => {
      await page.goto("/about");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const eyedropperButton = page.getByRole("button", { name: /choose|color|eyedropper/i });
      await eyedropperButton.first().click();
      const colorPicker = page.locator(
        '[class*="previewColorPickerActive"], [class*="react-colorful"], .HexColorPicker'
      );
      await expect(colorPicker).toBeVisible({ timeout: 5000 });
    });

    test("color picker can be closed by clicking outside", async ({ page }) => {
      await page.goto("/about");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const eyedropperButton = page.getByRole("button", { name: /choose|color|eyedropper/i });
      await eyedropperButton.first().click();
      const colorPicker = page.locator(
        '[class*="previewColorPickerActive"], [class*="react-colorful"]'
      );
      await expect(colorPicker).toBeVisible({ timeout: 5000 });
      await page.locator("main").click({ position: { x: 10, y: 10 } });
      await expect(colorPicker).not.toBeVisible();
    });

    test("color menu lock toggle is interactive", async ({ page }) => {
      await page.goto("/about");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const lockToggle = page.locator('[class*="colorMenu"] input[type="checkbox"]').first();
      await expect(lockToggle).toBeVisible({ timeout: 5000 });
      await lockToggle.click();
      await expect(lockToggle).toBeChecked();
    });
  });
});
