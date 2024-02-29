import styles from "./TitleHeader.module.scss";
import Icon from "../Icon";

const TitleHeader = ({
  iconName,
  title,
}: {
  iconName: string;
  title: string;
}) => {
  return (
    <div className={styles.titleHeader}>
      <Icon name={iconName} />
      <span>{title}</span>
    </div>
  );
};

export default TitleHeader;
