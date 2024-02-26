import { Link } from "react-router-dom";
import { useGameModeContext } from "../../contexts/GameModeProvider";
import Loader from "../Loader";
import Icon from "../Icon";
import styles from "./PagePreviewLink.module.scss";

const PagePreviewLink = ({
  pageName,
  metaData,
}: {
  pageName: string;
  metaData: { title: string; icon: string };
}) => {
  const { activeGameModes } = useGameModeContext();
  const gameModeActive =
    activeGameModes?.[pageName as keyof typeof activeGameModes];

  return (
    <Link className={styles.pagePreviewLink} to={`/${pageName}`}>
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

export default PagePreviewLink;
