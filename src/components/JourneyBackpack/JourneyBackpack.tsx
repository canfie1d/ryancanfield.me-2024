import Button from "~/components/Button";
import Icon from "~/components/Icon";
import { useInventoryStore } from "~/stores/inventory";
import { useLockedItemsStore } from "~/stores/locked-items";
import { useAchievementStore } from "~/stores/achievements";
import {
  type InventoryItemId,
  type JewelId,
  INVENTORY_ITEMS,
  INVENTORY_DISPLAY_ORDER,
  PAGE_FOR_JEWEL,
} from "~/data/inventory";
import { useUiStrings } from "~/hooks/useSanityContent";
import { useGetColorsFromTheme } from "~/helpers/getColorsFromTheme";
import styles from "./JourneyBackpack.module.scss";

const ItemIcon = ({
  icon,
  itemId,
  locked,
}: {
  icon: string;
  itemId: InventoryItemId;
  locked: boolean;
}) => {
  const page = itemId in PAGE_FOR_JEWEL ? PAGE_FOR_JEWEL[itemId as JewelId] : "about";
  const { backgroundColor } = useGetColorsFromTheme(page);
  const color = itemId in PAGE_FOR_JEWEL ? backgroundColor : undefined;
  const isSocketItem = itemId in PAGE_FOR_JEWEL && !locked;
  return isSocketItem ?
      <span className={styles.jewelBg}>
        <Icon
          name={icon}
          size="small"
          color={color}
        />
      </span>
    : <Icon
        name={locked ? "lock2" : icon}
        size="small"
        color={color}
      />;
};

/** Backpack view on journey page when user has valid code. Shows locked jewel + items. */
const JourneyBackpack = () => {
  const { items, getItem, addItem, removeItem, hasItem } = useInventoryStore();
  const { locked, isLocked, removeLocked } = useLockedItemsStore();
  const { setToast } = useAchievementStore();
  const { data: ui } = useUiStrings();

  const canUseKey = hasItem("key") && locked.includes("jewel-about");

  const handleUseKey = () => {
    if (!canUseKey) return;
    removeItem("key");
    removeLocked("jewel-about");
    addItem("jewel-about");
    const jewel = INVENTORY_ITEMS["jewel-about"];
    setToast({
      open: true,
      title: jewel.name,
      message: jewel.description,
    });
  };

  // Combine: locked items (shown as locked) + regular items. Locked items appear in display order.
  const displayItems = (() => {
    const seen = new Set<InventoryItemId>();
    const result: { id: InventoryItemId; locked: boolean }[] = [];

    for (const id of INVENTORY_DISPLAY_ORDER) {
      if (id === "jewel-about" && isLocked("jewel-about" as JewelId)) {
        result.push({ id: "jewel-about", locked: true });
        seen.add("jewel-about");
      } else if (items.includes(id)) {
        result.push({ id, locked: false });
        seen.add(id);
      }
    }

    // Add any locked jewels not in display order
    for (const id of locked) {
      if (!seen.has(id)) {
        result.push({ id, locked: true });
      }
    }

    return result;
  })();

  const totalCount = displayItems.length;

  return (
    <div className={styles.backpack}>
      <div className={styles.header}>
        <span
          className={styles.headerIcon}
          aria-hidden
        >
          <Icon
            name="backpack"
            size="medium"
          />
        </span>
        <div className={styles.headerText}>
          <h2 className={styles.headerTitle}>{ui?.inventoryTitle ?? "Backpack"}</h2>
          <h3 className={styles.headerSubtitle}>
            {totalCount === 0 ? "0 items" : `${totalCount} item${totalCount === 1 ? "" : "s"}`}
          </h3>
        </div>
      </div>

      {canUseKey && (
        <Button
          pageName="journey-to-eryndor"
          variant="secondary"
          onClick={handleUseKey}
          className={styles.useKeyButton}
        >
          <Icon
            name="lock-question"
            size="small"
          />
          <span>Use key to unlock</span>
        </Button>
      )}

      {displayItems.length === 0 ?
        <div className={styles.emptyState}>
          <span
            className={styles.emptyIcon}
            aria-hidden
          >
            <Icon
              name="backpack"
              size="medium"
            />
          </span>
          <h3 className={styles.emptyTitle}>{ui?.inventoryEmptyTitle ?? ""}</h3>
          <p className={styles.emptyMessage}>{ui?.inventoryEmptyMessage ?? ""}</p>
        </div>
      : <ul className={styles.itemList}>
          {displayItems.map(({ id, locked: isItemLocked }) => {
            const invItem = getItem(id);
            const def = INVENTORY_ITEMS[id as keyof typeof INVENTORY_ITEMS];
            if (!def) return null;
            const item = invItem ?? { id, ...def };
            return (
              <li
                key={id}
                className={`${styles.itemRow} ${isItemLocked ? styles.itemRowLocked : ""}`}
              >
                <span className={styles.itemIcon}>
                  <ItemIcon
                    icon={item.icon}
                    itemId={id}
                    locked={isItemLocked}
                  />
                </span>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemDesc}>
                    {isItemLocked ? "Locked. Use the key to unlock." : item.description}
                  </span>
                </div>
                {isItemLocked && (
                  <span className={styles.lockedBadge}>
                    <Icon
                      name="lock2"
                      size="x-small"
                    />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
};

export default JourneyBackpack;
