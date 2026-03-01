import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

/**
 * Prerequisite: Assert Sanity content is loading (API returns 200).
 * Use as the first test in a test.describe.serial() block so other tests skip if this fails.
 */
export async function assertSanityContentLoaded(page: Page) {
  const sanityResponse = page.waitForResponse(
    (response) =>
      response.url().includes("api.sanity.io") &&
      response.url().includes("/data/query/") &&
      response.request().method() === "GET",
    { timeout: 60000 }
  );

  await page.goto("/about", { timeout: 60000 });

  const response = await sanityResponse;
  expect(
    response.status(),
    "Sanity API should return 200 (check CORS origins at sanity.io/manage)"
  ).toBe(200);
}

/**
 * Wait for page content animations to complete (fadeIn, motion, etc.).
 * Content animates in with durations up to 600ms + 400ms delay.
 */
export async function waitForAnimations(page: Page, ms = 1000) {
  await page.waitForTimeout(ms);
}

/**
 * Seeds localStorage so the user can view the Inventory and Settings modals.
 * The backpack icon appears when the user has "the_journey_begins" achievement
 * OR when any game mode is active. We seed both for reliability.
 */
export async function seedUserWithInventoryAccess(page: Page) {
  await page.addInitScript(() => {
    // Achievement store: the_journey_begins unlocks Inventory + Settings icons
    const achievementStorage = {
      state: {
        achievements: [
          {
            id: "the_journey_begins",
            title: "The Journey Begins",
            description: "Find the start of the journey",
            collectedDate: new Date().toISOString(),
            icon: "compass",
          },
        ],
        loadingAchievements: false,
        username: "test-user",
        achievementsLookup: null,
        toast: { open: false, title: "", message: "" },
      },
      version: 1,
    };
    localStorage.setItem("achievement-storage", JSON.stringify(achievementStorage));

    // Game mode store: active mode also shows Inventory (belt-and-suspenders)
    const gameModeStorage = {
      state: {
        allGameModesActive: false,
        activeGameModes: { about: true, work: false, writing: false, contact: false },
        cursor: "default",
      },
      version: 1,
    };
    localStorage.setItem("game-mode-storage", JSON.stringify(gameModeStorage));
  });
}
