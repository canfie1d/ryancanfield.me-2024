import { Link } from "@tanstack/react-router";
import Loader from "~/components/Loader";
import Icon from "~/components/Icon";
import Text from "~/components/Text";
import styles from "./PagePreviewLink.module.scss";
import { useGameModeStore } from "~/stores/game-mode";

const PagePreviewLink = ({
  pageName,
  metaData,
  textColor,
}: {
  pageName: string;
  metaData: { title: string; icon: string };
  textColor: string;
}) => {
  const activeGameModes = useGameModeStore((store) => store.activeGameModes);
  const gameModeActive = activeGameModes?.[pageName as keyof typeof activeGameModes];

  return (
    <Link
      className={styles.pagePreviewLink}
      to={`/${pageName}` as string}
    >
      <div className={styles.previewContent}>
        {pageName === "journey-to-eryndor" ?
          <Loader />
        : <div className={styles.previewContentBody}>
            <Icon name={metaData.icon} />
            {!gameModeActive && <Text color={textColor}>{metaData.title}</Text>}
          </div>
        }
      </div>
    </Link>
  );
};

export default PagePreviewLink;
