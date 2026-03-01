import { useEffect } from "react";
import { useInventoryItems } from "~/hooks/useSanityContent";
import { setInventoryItemsLookup } from "~/lib/inventoryItemsOverride";
import type { InventoryItemId } from "~/data/inventory";

/** Syncs Sanity inventory items to the module-level override used by the inventory store. */
export function InventoryItemsProvider({ children }: { children: React.ReactNode }) {
  const { data: sanityItems } = useInventoryItems();

  useEffect(() => {
    if (sanityItems?.length) {
      const lookup = {} as Record<
        InventoryItemId,
        {
          name: string;
          description: string;
          icon: string;
          useContent: string;
          addOnFor?: InventoryItemId;
        }
      >;
      for (const item of sanityItems) {
        if (
          item?.id &&
          [
            "note",
            "key",
            "code",
            "jewel-about",
            "jewel-work",
            "jewel-writing",
            "jewel-contact",
            "sword",
            "sword-jewel",
          ].includes(item.id)
        ) {
          lookup[item.id as InventoryItemId] = {
            name: item.name ?? "",
            description: item.description ?? "",
            icon: item.icon ?? "",
            useContent: item.useContent ?? "",
            ...(item.addOnFor && {
              addOnFor: item.addOnFor as InventoryItemId,
            }),
          };
        }
      }
      if (Object.keys(lookup).length > 0) {
        setInventoryItemsLookup(lookup);
        return;
      }
    }
    setInventoryItemsLookup(null);
  }, [sanityItems]);

  return <>{children}</>;
}
