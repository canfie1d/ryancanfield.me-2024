import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import Atom from "../icons/atom.svg?react";
import At from "../icons/at.svg?react";
import Brain from "../icons/brain.svg?react";
import CodeCircle from "../icons/code-circle.svg?react";
import styles from "../styles/preview.module.scss";
import classNames from "classnames";
import { usePageScrollContext } from "../contexts/PageScrollProvider";

const InnerContent = ({
  icon,
  text,
  hoverText,
  isHovered,
}: {
  icon: ReactNode;
  text: string;
  hoverText: string;
  isHovered?: boolean;
}) => {
  const { scrolled } = usePageScrollContext();

  return (
    <>
      {icon}
      <p className={styles.previewLinkContent}>{text}</p>
      <p
        className={classNames(
          styles.previewLinkHoverContent,
          isHovered && !scrolled && styles.previewLinkHoverContentHovered
        )}
      >
        {hoverText}
      </p>
    </>
  );
};

const PreviewContent = ({ pageName }: { pageName: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const getPreviewContent = () => {
    switch (pageName) {
      case "about":
        return (
          <InnerContent
            isHovered={isHovered}
            icon={<Atom />}
            text="about"
            hoverText="⌘^1"
          />
        );
      case "work":
        return (
          <InnerContent
            isHovered={isHovered}
            icon={<CodeCircle />}
            text="work"
            hoverText="⌘^2"
          />
        );
      case "writing":
        return (
          <InnerContent
            isHovered={isHovered}
            icon={<Brain />}
            text="writing"
            hoverText="⌘^3"
          />
        );
      case "contact":
        return (
          <InnerContent
            isHovered={isHovered}
            icon={<At />}
            text="contact"
            hoverText="⌘^4"
          />
        );
      default:
        break;
    }
  };

  return (
    <Link
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={styles.previewLink}
      to={`/${pageName}`}
    >
      <div className={styles.previewContent}>{getPreviewContent()}</div>
    </Link>
  );
};

export default PreviewContent;
