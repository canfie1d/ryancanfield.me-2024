import { describe, it, expect, beforeEach, vi } from "vitest";
import { useInventoryStore } from "~/stores/inventory";
import { useJewelSocketStore } from "~/stores/jewel-sockets";
import { useAchievementStore } from "~/stores/achievements";
import { useLockedItemsStore } from "~/stores/locked-items";
import {
  INVENTORY_DISPLAY_ORDER,
  JEWEL_FOR_PAGE,
  type InventoryItemId,
} from "~/data/inventory";

/** Reset all game-related stores before each test */
function resetAllStores() {
  useInventoryStore.getState().resetInventory();
  useLockedItemsStore.setState({
    locked: [],
    journeyBackpackSeen: false,
  });
  useJewelSocketStore.setState({ placedJewels: {} });
  useAchievementStore.setState({
    achievements: [],
    loadingAchievements: false,
  });
}

describe("Inventory acquisition", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    resetAllStores();
  });

  it("can acquire all inventory items via store methods", () => {
    const { addItem, hasItem } = useInventoryStore.getState();

    // Core items: note, key, code
    addItem("note");
    addItem("key");
    addItem("code");

    // Jewels
    addItem("jewel-about");
    addItem("jewel-work");
    addItem("jewel-writing");
    addItem("jewel-contact");

    // Sword (earned by placing all jewels) and sword-jewel
    addItem("sword");
    addItem("sword-jewel");

    const { items } = useInventoryStore.getState();
    const expectedIds = [...INVENTORY_DISPLAY_ORDER];

    expect(items).toHaveLength(expectedIds.length);
    for (const id of expectedIds as InventoryItemId[]) {
      expect(hasItem(id)).toBe(true);
    }
  });

  it("addItem does not duplicate items", () => {
    const { addItem, hasItem } = useInventoryStore.getState();

    addItem("note");
    addItem("note");
    addItem("note");

    expect(hasItem("note")).toBe(true);
    expect(useInventoryStore.getState().items).toHaveLength(1);
  });

  it("placing all four jewels grants sword and wield achievement", async () => {
    const { addItem } = useInventoryStore.getState();
    const { placeJewel } = useJewelSocketStore.getState();

    // Add all jewels to inventory first
    for (const page of Object.keys(JEWEL_FOR_PAGE) as Array<keyof typeof JEWEL_FOR_PAGE>) {
      const jewelId = JEWEL_FOR_PAGE[page];
      addItem(jewelId);
    }

    // Place each jewel in its socket (syncGameModeFromJewels calls addAchievement which is async)
    placeJewel("about");
    placeJewel("work");
    placeJewel("writing");
    placeJewel("contact");

    // Allow async addAchievement to complete
    await new Promise((r) => setTimeout(r, 0));

    expect(useInventoryStore.getState().hasItem("sword")).toBe(true);
    expect(useAchievementStore.getState().hasAchievement("wield")).toBe(true);
  });

  it("getItem returns correct item data for each inventory item", () => {
    const { addItem, getItem } = useInventoryStore.getState();

    for (const id of INVENTORY_DISPLAY_ORDER as InventoryItemId[]) {
      addItem(id);
      const item = getItem(id);
      expect(item).not.toBeNull();
      expect(item?.id).toBe(id);
      expect(item?.name).toBeDefined();
      expect(item?.description).toBeDefined();
      expect(item?.icon).toBeDefined();
    }
  });

  it("removeItem removes item from inventory", () => {
    const { addItem, removeItem, hasItem } = useInventoryStore.getState();

    addItem("note");
    expect(hasItem("note")).toBe(true);

    removeItem("note");
    expect(hasItem("note")).toBe(false);
  });

  it("resetInventory clears all items", () => {
    const { addItem, resetInventory } = useInventoryStore.getState();

    addItem("note");
    addItem("key");
    expect(useInventoryStore.getState().items.length).toBeGreaterThan(0);

    resetInventory();
    expect(useInventoryStore.getState().items).toHaveLength(0);
  });
});
