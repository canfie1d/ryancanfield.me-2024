import { Children, ReactNode, useState } from "react";
import Button from "~/components/Button";
import styles from "./Tabs.module.scss";
import { PageNames } from "~/data/themeConfig";
import { getColorsFromTheme } from "~/helpers/getColorsFromTheme";

const Tabs = ({
  options,
  pageName,
  children,
}: {
  options: { id: string; label: string }[];
  pageName: PageNames;
  children: ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState(options[0].id);
  const { textColor, backgroundColor } = getColorsFromTheme(pageName);
  if (!Array.isArray(children)) {
    throw new Error("Tabs component requires at least two children");
  }

  return (
    <div className={styles.tabs}>
      <div className={styles.tabsHeader}>
        {options.map((option) => (
          <Button
            key={option.id}
            variant={activeTab === option.id ? "secondary" : undefined}
            onClick={() => setActiveTab(option.id)}
            style={
              activeTab === option.id
                ? {
                    cursor: "default",
                    color: backgroundColor,
                    backgroundColor: textColor,
                  }
                : { backgroundColor: backgroundColor, color: textColor }
            }
          >
            {option.label}
          </Button>
        ))}
      </div>
      {Children.map(children, (child, i) => {
        return (
          child?.props.id === activeTab && (
            <div key={i} className={styles.tabsContent}>
              {children[i]}
            </div>
          )
        );
      })}
    </div>
  );
};

export default Tabs;
