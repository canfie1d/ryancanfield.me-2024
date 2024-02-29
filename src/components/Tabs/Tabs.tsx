import { Children, ReactNode, useState } from "react";
import Button from "../Button";
import styles from "./Tabs.module.scss";

const Tabs = ({
  options,
  children,
}: {
  options: { id: string; label: string }[];
  children: ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState(options[0].id);

  if (!Array.isArray(children)) {
    throw new Error("Tabs component requires at least two children");
  }

  return (
    <div className={styles.tabs}>
      <div className={styles.tabsHeader}>
        {options.map((option) => (
          <Button
            key={option.id}
            variant={activeTab !== option.id ? "secondary" : undefined}
            onClick={() => setActiveTab(option.id)}
          >
            {option.label}
          </Button>
        ))}
      </div>
      {Children.map(children, (child, i) => {
        return (
          child?.props.id === activeTab && (
            <div className={styles.tabsContent}>{children[i]}</div>
          )
        );
      })}
    </div>
  );
};

export default Tabs;
