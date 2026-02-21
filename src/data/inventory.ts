export type InventoryItemId = "note" | "key" | "code";

export type InventoryItem = {
  id: InventoryItemId;
  name: string;
  description: string;
  icon: string;
  /** Content shown when the item is used/read */
  useContent: string;
};

export const INVENTORY_ITEMS: Record<
  InventoryItemId,
  Omit<InventoryItem, "id">
> = {
  note: {
    name: "Crumpled Note",
    description: "A weathered scrap of paper with faded handwriting.",
    icon: "scroll",
    useContent:
      "The road winds on. Those who look find more than they expect. Type lore() in the console if you haven't already.",
  },
  key: {
    name: "Tarnished Key",
    description: "An old brass key. It might unlock something.",
    icon: "lock-question",
    useContent:
      "The key fits nothing here—but perhaps it opens a door elsewhere. The README holds secrets for the curious.",
  },
  code: {
    name: "Code Snippet",
    description: "A printout of code, perhaps from a README.",
    icon: "code-circle",
    useContent:
      "// The source is the destination\n// https://github.com/canfie1d/ryancanfield.me-2024/blob/main/README.md",
  },
};
