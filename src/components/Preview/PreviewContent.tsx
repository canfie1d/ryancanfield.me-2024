import { Link } from "react-router-dom";
import { useGameModeContext } from "../../contexts/GameModeProvider";
import Loader from "../Loader";
import styles from "./PreviewContent.module.scss";
import Icon from "../Icon";
import classNames from "classnames";

const PreviewContent = ({
  pageName,
  metaData,
  scrolled,
}: {
  pageName: string;
  metaData: { title: string; icon: string };
  scrolled?: boolean;
}) => {
  const { activeGameModes } = useGameModeContext();
  const gameModeActive =
    activeGameModes?.[pageName as keyof typeof activeGameModes];

  return (
    <Link
      className={classNames(
        styles.previewContentLink,
        scrolled && styles.previewContentLinkScrolled
      )}
      to={`/${pageName}`}
    >
      <div className={styles.previewContent}>
        {pageName === "journeys-end" ? (
          <Loader />
        ) : (
          <div className={styles.previewContentBody}>
            <Icon name={metaData.icon} />
            {!gameModeActive && <p>{metaData.title}</p>}
          </div>
        )}
      </div>
    </Link>
  );
};

export default PreviewContent;
