import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "@tanstack/react-router";
import Modal from "~/components/Modal";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import { useInventoryStore } from "~/stores/inventory";
import { useUiStrings } from "~/hooks/useSanityContent";
import {
  type InventoryItemId,
  type JewelId,
  INVENTORY_DISPLAY_ORDER,
  PAGE_FOR_JEWEL,
} from "~/data/inventory";
import { useGetColorsFromTheme } from "~/helpers/getColorsFromTheme";
import styles from "./InventoryModal.module.scss";

const SLOT_COUNT = 9; // 3x3 grid

const ItemIcon = ({ icon, itemId }: { icon: string; itemId: InventoryItemId }) => {
  const page =
    icon === "jewel" && itemId in PAGE_FOR_JEWEL ? PAGE_FOR_JEWEL[itemId as JewelId] : "about";
  const { backgroundColor } = useGetColorsFromTheme(page);
  const color = icon === "jewel" && itemId in PAGE_FOR_JEWEL ? backgroundColor : undefined;
  const isJewel = icon === "jewel" && itemId in PAGE_FOR_JEWEL;
  return isJewel ?
      <span className={styles.jewelBg}>
        <Icon
          name={icon}
          size="small"
          color={color}
        />
      </span>
    : <Icon
        name={icon}
        size="small"
        color={color}
      />;
};

const InventoryModal = ({
  open,
  handleCloseClick,
}: {
  open: boolean;
  handleCloseClick: () => void;
}) => {
  const { pathname } = useLocation();
  const { items, getItem } = useInventoryStore();
  const { data: ui } = useUiStrings();
  const [inspectingItem, setInspectingItem] = useState<InventoryItemId | null>(null);

  const sortedItems = useMemo(
    () => INVENTORY_DISPLAY_ORDER.filter((id) => items.includes(id)),
    [items],
  );

  // Build slot array: items fill slots in order, remaining slots are empty
  const slots = useMemo(() => {
    const filled: Array<InventoryItemId | null> = sortedItems.slice(0, SLOT_COUNT);
    while (filled.length < SLOT_COUNT) filled.push(null);
    return filled;
  }, [sortedItems]);

  const getTriggerLocation = () => {
    if (pathname === "/") return "23% 108%";
    return "107% 115%";
  };

  const handleUse = (id: InventoryItemId) => {
    setInspectingItem(id);
  };

  const item = inspectingItem ? getItem(inspectingItem) : null;

  if (typeof document === "undefined") return null;

  return (
    <>
      {createPortal(
        <Modal
          show={open}
          onClose={() => {
            setInspectingItem(null);
            handleCloseClick();
          }}
          transformOrigin={getTriggerLocation()}
          small
          bottomSheet
          header={
            <div className={styles.modalHeader}>
              <span
                className={styles.modalHeaderIcon}
                aria-hidden
              >
                <Icon
                  name="backpack"
                  size="medium"
                />
              </span>
              <div className={styles.modalHeaderText}>
                <h2 className={styles.modalHeaderTitle}>{ui?.inventoryTitle ?? ""}</h2>
                <h3 className={styles.modalHeaderSubtitle}>
                  {items.length === 0 ?
                    "0 items"
                  : `${items.length} item${items.length === 1 ? "" : "s"}`}
                </h3>
              </div>
              <Button
                variant="transparent"
                onClick={() => {
                  setInspectingItem(null);
                  handleCloseClick();
                }}
                ariaLabel={ui?.ariaCloseModal ?? ""}
              >
                <Icon name="circle-x" />
              </Button>
            </div>
          }
        >
          {item ?
            <div className={styles.inspecting}>
              <div className={styles.inspectingHeader}>
                <span className={styles.inspectingIcon}>
                  <ItemIcon
                    icon={item.icon}
                    itemId={item.id}
                  />
                </span>
                <h3 className={styles.inspectingTitle}>{item.name}</h3>
              </div>
              <pre className={styles.useContent}>{item.useContent}</pre>
              <Button
                variant="secondary"
                onClick={() => setInspectingItem(null)}
              >
                {ui?.inventoryButtonBack ?? ""}
              </Button>
            </div>
          : items.length === 0 ?
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
          : <ul
              className={styles.itemGrid}
              role="list"
            >
              {slots.map((id, index) => {
                if (!id) {
                  return (
                    <li
                      key={`empty-${index}`}
                      className={styles.itemSlot}
                    >
                      <span
                        className={styles.itemSlotEmpty}
                        aria-hidden
                      />
                    </li>
                  );
                }
                const invItem = getItem(id);
                if (!invItem) return null;
                const isAddOn = invItem.addOnFor != null;
                return (
                  <li
                    key={id}
                    className={
                      isAddOn ? `${styles.itemSlot} ${styles.itemSlotAddOn}` : styles.itemSlot
                    }
                  >
                    <button
                      type="button"
                      className={styles.itemSlotButton}
                      onClick={() => handleUse(id)}
                      aria-label={`Use ${invItem.name}`}
                    >
                      <span className={styles.itemSlotIcon}>
                        <ItemIcon
                          icon={invItem.icon}
                          itemId={id}
                        />
                      </span>
                      <span className={styles.itemSlotName}>{invItem.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          }
        </Modal>,
        document.body,
        "inventory-modal",
      )}
    </>
  );
};

export default InventoryModal;
