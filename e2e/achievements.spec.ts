import { test, expect } from "@playwright/test";
import { assertSanityContentLoaded, seedUserWithInventoryAccess, waitForAnimations } from "./fixtures";
import { ACHIEVEMENTS } from "../src/data/achievements";

/** Assert that the given achievement ID exists in localStorage achievement-storage */
async function expectAchievementCollected(
  page: import("@playwright/test").Page,
  achievementId: string
) {
  const hasAchievement = await page.evaluate(
    (id) => {
      try {
        const raw = localStorage.getItem("achievement-storage");
        if (!raw) return false;
        const parsed = JSON.parse(raw);
        const achievements = parsed?.state?.achievements ?? [];
        return achievements.some((a: { id: string }) => a.id === id);
      } catch {
        return false;
      }
    },
    achievementId
  );
  expect(hasAchievement, `Expected achievement "${achievementId}" to be collected`).toBe(true);
}

test.describe("Achievement collection", () => {
  test.describe.serial("requires Sanity content", () => {
    test("Sanity content is loading", async ({ page }) => {
      await assertSanityContentLoaded(page);
    });

    test("first_timer - visiting any page", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator('a[href="/about"]')).toBeVisible({ timeout: 10000 });
      await waitForAnimations(page);
      await expectAchievementCollected(page, "first_timer");
    });

    test("about_face - visiting about page", async ({ page }) => {
      await page.goto("/about");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      await expectAchievementCollected(page, "about_face");
    });

    test("all_work_no_play - visiting work page", async ({ page }) => {
      await page.goto("/work");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      await expectAchievementCollected(page, "all_work_no_play");
    });

    test("writers_block - visiting writing page", async ({ page }) => {
      await page.goto("/writing");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      await expectAchievementCollected(page, "writers_block");
    });

    test("reach_out - visiting contact page", async ({ page }) => {
      await page.goto("/contact");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      await expectAchievementCollected(page, "reach_out");
    });

    test("so_studious - visiting case study page", async ({ page }) => {
      await page.goto("/work");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const caseStudyLinks = page.locator('a[href^="/work/"]');
      const count = await caseStudyLinks.count();
      if (count === 0) {
        test.skip(true, "No case study links on work page (seed Sanity with case studies)");
      }
      await caseStudyLinks.first().click();
      await expect(page).toHaveURL(/\/work\/.+/);
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      await expectAchievementCollected(page, "so_studious");
    });

    test("lost_and_found - visiting 404 page", async ({ page }) => {
      await page.goto("/nonexistent-page-404");
      await expect(page).toHaveURL(/nonexistent-page-404/);
      await expectAchievementCollected(page, "lost_and_found");
    });

    test("number_cruncher - visiting /6374", async ({ page }) => {
      await page.goto("/6374");
      await expect(page).toHaveURL("/6374");
      await expect(page.locator("text=Input this word")).toBeVisible({ timeout: 10000 });
      await waitForAnimations(page);
      await expectAchievementCollected(page, "number_cruncher");
    });

    test("circle_around - visiting circled path route", async ({ page }) => {
      await page.goto("/⓺⓷⓻⓸");
      await expect(page.locator("text=Input this word")).toBeVisible({ timeout: 10000 });
      await waitForAnimations(page);
      await expectAchievementCollected(page, "circle_around");
    });

    test("power_user - using shortcut to navigate", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator('a[href="/about"]')).toBeVisible({ timeout: 10000 });
      await waitForAnimations(page);
      await page.keyboard.press("1");
      await expect(page).toHaveURL(/\/about/);
      await expectAchievementCollected(page, "power_user");
    });

    test("konami_code - entering Konami code", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator('a[href="/about"]')).toBeVisible({ timeout: 10000 });
      await waitForAnimations(page);
      await page.keyboard.press("ArrowUp");
      await page.keyboard.press("ArrowUp");
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("ArrowLeft");
      await page.keyboard.press("ArrowRight");
      await page.keyboard.press("ArrowLeft");
      await page.keyboard.press("ArrowRight");
      await page.keyboard.press("b");
      await page.keyboard.press("a");
      await expectAchievementCollected(page, "konami_code");
    });

    test("copy_pasta - copying color hex", async ({ page }) => {
      await page.goto("/about");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const colorLabel = page.locator("button").filter({ hasText: /^#[0-9a-fA-F]{6}$/ }).first();
      await colorLabel.click();
      await expectAchievementCollected(page, "copy_pasta");
    });

    test("custom - opening color picker", async ({ page }) => {
      await page.goto("/about");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const eyedropperButton = page.getByRole("button", { name: /choose|color|eyedropper/i });
      await eyedropperButton.first().click();
      await expect(page.locator('[class*="react-colorful"], .HexColorPicker')).toBeVisible({
        timeout: 5000,
      });
      await expectAchievementCollected(page, "custom");
    });

    test("fresh_coat - choosing a theme", async ({ page }) => {
      await page.goto("/about");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const themesButton = page.getByRole("button", { name: /theme/i });
      await themesButton.click();
      const themeOption = page.getByRole("dialog").locator("button").filter({ hasText: /./ }).first();
      await themeOption.click();
      await expectAchievementCollected(page, "fresh_coat");
    });

    test("picky_picky - opening settings panel", async ({ page }) => {
      await seedUserWithInventoryAccess(page);
      await page.goto("/");
      await expect(page.locator('a[href="/about"]')).toBeVisible({ timeout: 10000 });
      await waitForAnimations(page);
      const settingsButton = page.getByRole("button", { name: /setting/i });
      await settingsButton.click();
      await expect(page.getByRole("dialog")).toBeVisible({ timeout: 5000 });
      await expectAchievementCollected(page, "picky_picky");
    });

    test("gatherer - opening inventory", async ({ page }) => {
      await seedUserWithInventoryAccess(page);
      await page.goto("/");
      await expect(page.locator('a[href="/about"]')).toBeVisible({ timeout: 10000 });
      await waitForAnimations(page);
      const inventoryButton = page.getByRole("button", { name: /inventory/i });
      await inventoryButton.click();
      await expect(page.getByRole("dialog")).toBeVisible({ timeout: 5000 });
      await expectAchievementCollected(page, "gatherer");
    });

    test("octocat_abides - clicking GitHub link", async ({ page }) => {
      await page.goto("/about");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const githubLink = page.getByRole("link", { name: /github/i }).first();
      await githubLink.click();
      await expectAchievementCollected(page, "octocat_abides");
    });

    test("link_up - clicking LinkedIn link", async ({ page }) => {
      await page.goto("/about");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const linkedinLink = page.getByRole("link", { name: /linkedin/i }).first();
      await linkedinLink.click();
      await expectAchievementCollected(page, "link_up");
    });

    test("git_good - opening GitHub contributions modal", async ({ page }) => {
      await page.goto("/work");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const githubButton = page.getByRole("button", { name: /github|contributions/i }).first();
      await githubButton.click();
      await expect(page.locator("canvas")).toBeVisible({ timeout: 15000 });
      await expectAchievementCollected(page, "git_good");
    });

    test("feeding_back - clicking poll option in GitHub modal", async ({ page }) => {
      await page.goto("/work");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const githubButton = page.getByRole("button", { name: /github|contributions/i }).first();
      await githubButton.click();
      await expect(page.locator("canvas")).toBeVisible({ timeout: 15000 });
      const yesButton = page.getByRole("button", { name: /\( Y \)/ });
      await yesButton.click();
      await expectAchievementCollected(page, "feeding_back");
    });

    test("finders_keepers - hovering hidden button after choosing N", async ({ page }) => {
      await page.goto("/work");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      const githubButton = page.getByRole("button", { name: /github|contributions/i }).first();
      await githubButton.click();
      await expect(page.locator("canvas")).toBeVisible({ timeout: 15000 });
      const noButton = page.getByRole("button", { name: /\( N \)/ });
      await noButton.click();
      const closeButton = page.getByRole("button", { name: /close/i });
      await closeButton.click();
      await page.waitForTimeout(300);
      const vanishingButton = page.locator('button[class*="vanishing"]');
      await vanishingButton.hover();
      await expectAchievementCollected(page, "finders_keepers");
    });

    test("lock_down and fully_custom - locking all four colors", async ({ page }) => {
      const pages = ["/about", "/work", "/writing", "/contact"];
      for (const path of pages) {
        await page.goto(path);
        await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
        await waitForAnimations(page);
        const lockToggle = page.locator('[class*="colorMenu"] input[type="checkbox"]').first();
        await lockToggle.click();
      }
      await expectAchievementCollected(page, "lock_down");
      await expectAchievementCollected(page, "fully_custom");
    });

    test("chalice - toggling delete progress in settings", async ({ page }) => {
      await seedUserWithInventoryAccess(page);
      await page.goto("/");
      await expect(page.locator('a[href="/about"]')).toBeVisible({ timeout: 10000 });
      await waitForAnimations(page);
      const settingsButton = page.getByRole("button", { name: /setting/i });
      await settingsButton.click();
      const deleteToggle = page.getByRole("dialog").getByRole("switch", { name: /delete|progress/i });
      await deleteToggle.click();
      await expectAchievementCollected(page, "chalice");
    });

    test("no_code_needed - visiting journey-to-eryndor without code param", async ({ page }) => {
      await page.goto("/journey-to-eryndor");
      await expect(page).toHaveURL("/journey-to-eryndor");
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      await expectAchievementCollected(page, "no_code_needed");
    });

    test("the_scenic_route - visiting journey-to-eryndor with code param", async ({ page }) => {
      await page.goto("/journey-to-eryndor?code=1234");
      await expect(page).toHaveURL(/journey-to-eryndor/);
      await expect(page.locator(".contentBody")).toBeVisible({ timeout: 15000 });
      await waitForAnimations(page);
      await expectAchievementCollected(page, "the_scenic_route");
    });
  });
});

test.describe("Achievement definitions from Sanity", () => {
  test("all achievements have required fields for lookup", () => {
    for (const a of ACHIEVEMENTS) {
      expect(a.id, `Achievement missing id: ${JSON.stringify(a)}`).toBeDefined();
      expect(a.title, `Achievement ${a.id} missing title`).toBeDefined();
      expect(a.description, `Achievement ${a.id} missing description`).toBeDefined();
      expect(a.icon, `Achievement ${a.id} missing icon`).toBeDefined();
    }
  });
});
