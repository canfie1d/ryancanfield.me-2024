import { useEffect, useRef } from "react";
import { useAchievementContext } from "../contexts/AchievementProvider";
import { isElementInViewport } from "../helpers/isElementInViewport";
import { ARTICLE_LINKS } from "../data/content";
import Card from "../components/Card/Card";
import Tag from "../components/Tag";
import styles from "./Content.module.scss";

const WritingContent = () => {
  const viewed = useRef<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = isElementInViewport(ref?.current);

  const { hasAchievement, addAchievement } = useAchievementContext();

  useEffect(() => {
    if (!hasAchievement("writers_block") && inView && !viewed.current) {
      addAchievement("writers_block");
    }
  }, [inView]);

  return (
    <div className="contentBody">
      <p className={styles.p}>
        Although I don't have as many opportunities to write as I'd like these
        days, I do have a few articles that I've written that I'm proud of. Here
        are a few of my favorites:
      </p>
      <Card.Wrapper>
        {ARTICLE_LINKS.map((article, i) => (
          <Card
            key={`article-${i}`}
            type="article"
            title={article.title}
            href={article.url}
            opensInNewPage
            smallTitle
            onClick={() => {
              if (!hasAchievement("extra_medium")) {
                addAchievement("extra_medium");
              }
            }}
            footer={
              <div>
                <Tag>{article.length}</Tag>
              </div>
            }
          >
            <img src={article.imageUrl} alt="" />
            <p className={styles.p}>{article.description}</p>
          </Card>
        ))}
      </Card.Wrapper>
      <div ref={ref} />
    </div>
  );
};

export default WritingContent;
