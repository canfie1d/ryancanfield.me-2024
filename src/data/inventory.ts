export type JewelId = "jewel-about" | "jewel-work" | "jewel-writing" | "jewel-contact";

export type InventoryItemId =
  | "note"
  | "key"
  | "code"
  | JewelId
  | "sword"
  | "sword-jewel";

export type InventoryItem = {
  id: InventoryItemId;
  name: string;
  description: string;
  icon: string;
  /** Content shown when the item is used/read */
  useContent: string;
  /** If set, this item is an add-on for another item (e.g. jewel for sword) */
  addOnFor?: InventoryItemId;
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
  "jewel-about": {
    name: "The Eye of Eryndor",
    description: "A gleaming gem that reveals the path. Place it in the settings panel to unlock.",
    icon: "jewel",
    useContent:
      "The Eye sees all who wander. Place this jewel in the About socket in settings to unlock the game mode.",
  },
  "jewel-work": {
    name: "The Seal of Triumphs",
    description: "A jewel forged from victories. Place it in the settings panel to unlock.",
    icon: "jewel",
    useContent:
      "The Seal remembers every triumph. Place this jewel in the Work socket in settings to unlock the game mode.",
  },
  "jewel-writing": {
    name: "The Quill's Tear",
    description: "A crystalline drop from the quill of a scribe. Place it in the settings panel to unlock.",
    icon: "jewel",
    useContent:
      "The Quill's Tear holds stories. Place this jewel in the Writing socket in settings to unlock the game mode.",
  },
  "jewel-contact": {
    name: "The Signet of Reach",
    description: "A jewel that bridges distances. Place it in the settings panel to unlock.",
    icon: "jewel",
    useContent:
      "The Signet connects those who reach out. Place this jewel in the Contact socket in settings to unlock the game mode.",
  },
  sword: {
    name: "Blade of Eryndor",
    description: "A gleaming sword earned by activating all game modes. Wield it well.",
    icon: "sword",
    useContent:
      "The blade hums with purpose. With all paths walked, you've proven yourself ready. Your cursor becomes your weapon.",
  },
  "sword-jewel": {
    name: "Jewel of the Crown",
    description: "A precious gem that adorns the Blade of Eryndor.",
    icon: "jewel",
    useContent:
      "The jewel catches the light. Together with the blade, you carry the full measure of your journey.",
    addOnFor: "sword",
  },
};

/** Display order for inventory items (add-ons follow their parent) */
export const INVENTORY_DISPLAY_ORDER: InventoryItemId[] = [
  "note",
  "key",
  "code",
  "jewel-about",
  "jewel-work",
  "jewel-writing",
  "jewel-contact",
  "sword",
  "sword-jewel",
];

export const JEWEL_SOCKET_PAGES = ["about", "work", "writing", "contact"] as const;
export type JewelSocketPage = (typeof JEWEL_SOCKET_PAGES)[number];

export const JEWEL_FOR_PAGE: Record<JewelSocketPage, JewelId> = {
  about: "jewel-about",
  work: "jewel-work",
  writing: "jewel-writing",
  contact: "jewel-contact",
};

/** Maps jewel IDs to their page for color lookup */
export const PAGE_FOR_JEWEL: Record<JewelId, JewelSocketPage> = {
  "jewel-about": "about",
  "jewel-work": "work",
  "jewel-writing": "writing",
  "jewel-contact": "contact",
};
