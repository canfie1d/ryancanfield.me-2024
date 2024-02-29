import { useEffect, useRef } from "react";
import { useAchievementContext } from "../contexts/AchievementProvider";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { ARTICLE_LINKS } from "../data/content";
import Card from "../components/Card/Card";
import Tag from "../components/Tag";

const WritingContent = () => {
  const viewed = useRef<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useIntersectionObserver(ref?.current);

  const { hasAchievement, addAchievement } = useAchievementContext();

  useEffect(() => {
    if (!hasAchievement("writers_block") && inView && !viewed.current) {
      addAchievement("writers_block");
    }
  }, [inView]);

  return (
    <div className="contentBody">
      <p>
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
            <p>{article.description}</p>
          </Card>
        ))}
      </Card.Wrapper>
      <div ref={ref} />
    </div>
  );
};

export default WritingContent;
