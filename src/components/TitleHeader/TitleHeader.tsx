import Icon from "~/components/Icon";
import styles from "./TitleHeader.module.scss";

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
