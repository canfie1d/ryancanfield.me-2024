import type { InventoryItemId, InventoryItem } from "~/data/inventory";

/** Module-level override for inventory item definitions (from Sanity). Set by InventoryItemsProvider. */
let override: Record<InventoryItemId, Omit<InventoryItem, "id">> | null = null;

export function getInventoryItemsLookup():
  | Record<InventoryItemId, Omit<InventoryItem, "id">>
  | null {
  return override;
}

export function setInventoryItemsLookup(
  items: Record<InventoryItemId, Omit<InventoryItem, "id">> | null
) {
  override = items;
}
