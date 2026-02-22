import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "@tanstack/react-router";
import Modal from "~/components/Modal";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import { useInventoryStore } from "~/stores/inventory";
import { useUiStrings } from "~/hooks/useSanityContent";
import { type InventoryItemId, INVENTORY_DISPLAY_ORDER } from "~/data/inventory";
import styles from "./InventoryModal.module.scss";

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
                  <Icon
                    name={item.icon}
                    size="small"
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
          : <ul className={styles.itemList}>
              {sortedItems.map((id) => {
                const invItem = getItem(id);
                if (!invItem) return null;
                const isAddOn = invItem.addOnFor != null;
                return (
                  <li
                    key={id}
                    className={
                      isAddOn ? `${styles.itemRow} ${styles.itemRowAddOn}` : styles.itemRow
                    }
                  >
                    <span className={styles.itemIcon}>
                      <Icon
                        name={invItem.icon}
                        size="small"
                      />
                    </span>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemName}>{invItem.name}</span>
                      <span className={styles.itemDesc}>{invItem.description}</span>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => handleUse(id)}
                    >
                      {ui?.inventoryButtonUse ?? ""}
                    </Button>
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
