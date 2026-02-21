import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAchievementStore } from "~/stores/achievements";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import { getArticles, getPageContent } from "~/lib/sanityQueries";
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

  const { data: articles = [] } = useQuery({
    queryKey: ["sanity", "articles"],
    queryFn: getArticles,
  });

  const { data: pageContent } = useQuery({
    queryKey: ["sanity", "pageContent", "writing"],
    queryFn: () => getPageContent("writing"),
  });

  useEffect(() => {
    if (!hasAchievement("writers_block") && inView && !viewed.current) {
      addAchievement("writers_block");
    }
  }, [inView]);

  const introText =
    pageContent?.introText ?
      pageContent.introText
    : "Although I don't have as many opportunities to write as I'd like these days, I do have a few articles that I've written that I'm proud of. Here are a few of my favorites:";

  return (
    <div className="contentBody">
      <Text>{introText}</Text>
      <Card.Wrapper>
        {articles.map(
          (article: {
            _id: string;
            title: string;
            url: string;
            imageUrl?: string;
            description?: string;
            length?: string;
          }) => (
            <Card
              pageName="writing"
              key={article._id}
              type="article"
              title={article.title}
              href={article.url}
              opensInNewPage
              onClick={() => {
                if (!hasAchievement("extra_medium")) {
                  addAchievement("extra_medium");
                }
              }}
              footer={
                <div>
                  {article.length && (
                    <Tag
                      textColor={textColor}
                      backgroundColor={backgroundColor}
                    >
                      {article.length}
                    </Tag>
                  )}
                </div>
              }
            >
              {article.imageUrl && (
                <img
                  src={article.imageUrl}
                  alt=""
                />
              )}
              <Text size="small">{article.description}</Text>
            </Card>
          ),
        )}
      </Card.Wrapper>
      <div ref={ref} />
    </div>
  );
};

export default WritingContent;
