import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAchievementStore } from "~/stores/achievements";
import { ACHIEVEMENTS } from "~/data/achievements";
import type { AchievementType } from "~/stores/achievements";

/** Reset achievement store before each test */
function resetAchievementStore() {
  useAchievementStore.setState({
    achievements: [],
    loadingAchievements: false,
  });
}

describe("Achievement acquisition", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    resetAchievementStore();
  });

  it("can acquire all achievements via addAchievement", async () => {
    const { addAchievement, hasAchievement } = useAchievementStore.getState();
    const achievementIds = ACHIEVEMENTS.map((a) => a.id);

    for (const id of achievementIds) {
      await addAchievement(id);
    }

    const { achievements } = useAchievementStore.getState();
    expect(achievements).toHaveLength(achievementIds.length);

    for (const id of achievementIds) {
      expect(hasAchievement(id)).toBe(true);
    }
  });

  it("addAchievement does not duplicate achievements", async () => {
    const { addAchievement, hasAchievement } = useAchievementStore.getState();

    await addAchievement("first_timer");
    await addAchievement("first_timer");
    await addAchievement("first_timer");

    expect(hasAchievement("first_timer")).toBe(true);
    expect(useAchievementStore.getState().achievements).toHaveLength(1);
  });

  it("addAchievement with silent option does not show toast", async () => {
    const { addAchievement } = useAchievementStore.getState();
    const initialToast = useAchievementStore.getState().toast;

    await addAchievement("first_timer", { silent: true });

    const toast = useAchievementStore.getState().toast;
    expect(toast.open).toBe(initialToast.open);
    expect(toast.title).toBe(initialToast.title);
  });

  it("addAchievement ignores invalid achievement id", async () => {
    const { addAchievement } = useAchievementStore.getState();

    await addAchievement("nonexistent_achievement" as AchievementType["id"]);

    expect(useAchievementStore.getState().achievements).toHaveLength(0);
  });

  it("hasAchievement returns false for unacquired achievements", () => {
    const { hasAchievement } = useAchievementStore.getState();

    expect(hasAchievement("first_timer")).toBe(false);
    expect(hasAchievement("one_hundred")).toBe(false);
  });

  it("resetAchievements clears all achievements", async () => {
    const { addAchievement, resetAchievements } = useAchievementStore.getState();

    await addAchievement("first_timer");
    await addAchievement("about_face");
    expect(useAchievementStore.getState().achievements.length).toBeGreaterThan(0);

    await resetAchievements();
    expect(useAchievementStore.getState().achievements).toHaveLength(0);
  });

  it("each achievement has required fields", () => {
    for (const a of ACHIEVEMENTS) {
      expect(a.id).toBeDefined();
      expect(typeof a.id).toBe("string");
      expect(a.id.length).toBeGreaterThan(0);
      expect(a.title).toBeDefined();
      expect(a.description).toBeDefined();
      expect(a.icon).toBeDefined();
    }
  });
});
