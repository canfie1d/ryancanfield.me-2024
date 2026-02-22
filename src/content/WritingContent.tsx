import { useEffect, useRef } from "react";
import { useAchievementStore } from "~/stores/achievements";
import { useInventoryStore } from "~/stores/inventory";
import { useJewelDiscoveryStore } from "~/stores/jewel-discovery";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import { useArticleLinks, usePageContent } from "~/hooks/useSanityContent";
import Card from "~/components/Card/Card";
import Tag from "~/components/Tag";
import Text from "~/components/Text";
import { useGetColorsFromTheme } from "~/helpers/getColorsFromTheme";
import { urlFor } from "~/sanity/image";

const WritingContent = () => {
  const viewed = useRef<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useIntersectionObserver(ref?.current);
  const { textColor, backgroundColor } = useGetColorsFromTheme("writing");
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const markArticleViewed = useJewelDiscoveryStore((store) => store.markArticleViewed);
  const viewedArticleIds = useJewelDiscoveryStore((store) => store.viewedArticleIds);
  const addItem = useInventoryStore((store) => store.addItem);
  const hasItem = useInventoryStore((store) => store.hasItem);

  const { data: articleLinks } = useArticleLinks();
  const { data: pageContent } = usePageContent("writing");

  useEffect(() => {
    if (!hasAchievement("writers_block") && inView && !viewed.current) {
      addAchievement("writers_block");
    }
  }, [inView, addAchievement, hasAchievement]);

  useEffect(() => {
    const total = articleLinks?.length ?? 0;
    if (
      total > 0 &&
      hasAchievement("writers_block") &&
      viewedArticleIds.length >= total &&
      !hasItem("jewel-writing")
    ) {
      addItem("jewel-writing");
    }
  }, [articleLinks?.length, hasAchievement, viewedArticleIds.length, hasItem, addItem]);

  const introText = pageContent?.introText ?? "";

  return (
    <div className="contentBody">
      <Text>{introText}</Text>
      <Card.Wrapper>
        {articleLinks?.map((article, i) => (
          <Card
            pageName="writing"
            key={`article-${i}`}
            type="article"
            title={article.title ?? ""}
            href={article.url}
            opensInNewPage
            onClick={() => {
              markArticleViewed(article.url ?? article.title ?? `article-${i}`);
              if (!hasAchievement("extra_medium")) {
                addAchievement("extra_medium");
              }
            }}
            footer={
              <div>
                <Tag
                  textColor={textColor}
                  backgroundColor={backgroundColor}
                >
                  {article.length}
                </Tag>
              </div>
            }
          >
            <img
              src={article.image ? urlFor(article.image).url() : (article.imageUrl ?? "")}
              alt=""
            />
            <Text size="small">{article.description}</Text>
          </Card>
        ))}
      </Card.Wrapper>
      <div ref={ref} />
    </div>
  );
};

export default WritingContent;
