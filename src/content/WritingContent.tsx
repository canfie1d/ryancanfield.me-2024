import { useEffect, useRef } from "react";
import { useAchievementStore } from "~/stores/achievements";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import { ARTICLE_LINKS } from "~/data/content";
import Card from "~/components/Card/Card";
import Tag from "~/components/Tag";
import Text from "~/components/Text";
import { getColorsFromTheme } from "~/helpers/getColorsFromTheme";

const WritingContent = () => {
  const viewed = useRef<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useIntersectionObserver(ref?.current);
  const { textColor, backgroundColor } = getColorsFromTheme("writing");
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  useEffect(() => {
    if (!hasAchievement("writers_block") && inView && !viewed.current) {
      addAchievement("writers_block");
    }
  }, [inView]);

  return (
    <div className="contentBody">
      <Text>
        Although I don't have as many opportunities to write as I'd like these
        days, I do have a few articles that I've written that I'm proud of. Here
        are a few of my favorites:
      </Text>
      <Card.Wrapper>
        {ARTICLE_LINKS.map((article, i) => (
          <Card
            pageName="writing"
            key={`article-${i}`}
            type="article"
            title={article.title}
            href={article.url}
            opensInNewPage
            // smallTitle
            onClick={() => {
              if (!hasAchievement("extra_medium")) {
                addAchievement("extra_medium");
              }
            }}
            footer={
              <div>
                <Tag textColor={textColor} backgroundColor={backgroundColor}>
                  {article.length}
                </Tag>
              </div>
            }
          >
            <img src={article.imageUrl} alt="" />
            <Text size="small">{article.description}</Text>
          </Card>
        ))}
      </Card.Wrapper>
      <div ref={ref} />
    </div>
  );
};

export default WritingContent;
