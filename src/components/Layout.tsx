import { ReactNode } from "react";
import { useThemeContext } from "../contexts/ThemeProvider";
import styles from "../styles/layout.module.scss";

const Layout = ({ children }: { children: ReactNode }) => {
  const { backgroundColors } = useThemeContext();

  return (
    <div
      style={{
        backgroundColor: backgroundColors ? backgroundColors[4] : "#fff",
      }}
      className={styles.layout}
    >
      {children}
    </div>
  );
};

export default Layout;
