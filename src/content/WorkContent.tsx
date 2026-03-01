import { lazy, Suspense, useEffect, useRef } from "react";
import { useAchievementStore } from "~/stores/achievements";
import { useProjects, useOpenSource, usePageContent, useUiStrings } from "~/hooks/useSanityContent";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";

const GithubContributions = lazy(() => import("~/components/GithubContributions"));
import Card from "~/components/Card/Card";
import Text from "~/components/Text";
import Tag from "~/components/Tag";
import styles from "./PageContent.module.scss";
import { useGetColorsFromTheme } from "~/helpers/getColorsFromTheme";
import { urlFor, urlForOptimized } from "~/sanity/image";

const WorkContent = () => {
  const viewed = useRef<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useIntersectionObserver(ref?.current);
  const { textColor, backgroundColor } = useGetColorsFromTheme("work");
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  const { data: projects } = useProjects();
  const { data: openSource } = useOpenSource();
  const { data: pageContent } = usePageContent("work");
  const { data: ui } = useUiStrings();

  useEffect(() => {
    if (!hasAchievement("writers_block") && inView && !viewed.current) {
      addAchievement("writers_block");
    }
  }, [inView, addAchievement, hasAchievement]);

  const introText = pageContent?.introText ?? "";
  const introParagraphs = introText.split(/\n\n+/).filter(Boolean) as string[];

  return (
    <div className="contentBody">
      {introParagraphs.map((para: string, i: number) => (
        <Text key={i}>{para}</Text>
      ))}
      <Card.Wrapper>
        {projects?.map((project, i) => (
          <Card
            pageName="work"
            key={`project-${i}`}
            title={project.title ?? ""}
            href={project.url ?? ""}
            className={styles.caseStudy}
            footer={
              <div>
                {project.tags?.length &&
                  project.tags.map((tag: string, i: number) => (
                    <Tag
                      textColor={textColor}
                      backgroundColor={backgroundColor}
                      key={`tag-${i}`}
                    >
                      {tag}
                    </Tag>
                  ))}
              </div>
            }
          >
            <img
              src={
                project.image ?
                  i === 0 ?
                    urlForOptimized(project.image)
                  : urlFor(project.image).width(500).quality(75).auto("format").url()
                : ""
              }
              alt={project.title ?? ""}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : undefined}
            />
            <Text size="small">{project.description}</Text>
          </Card>
        ))}
      </Card.Wrapper>
      <h3>{ui?.workSectionOpenSource ?? ""}</h3>
      <Card.Wrapper>
        {openSource?.map((item, i) => (
          <Card
            pageName="work"
            key={`item-${i}`}
            title={item.title ?? ""}
            className={styles.caseStudy}
            footer={
              <div>
                {item.githubUrl && (
                  <Tag
                    textColor={textColor}
                    backgroundColor={backgroundColor}
                    url={item.githubUrl}
                  >
                    Github
                  </Tag>
                )}
                {item.npmUrl && (
                  <Tag
                    textColor={textColor}
                    backgroundColor={backgroundColor}
                    url={item.npmUrl}
                  >
                    NPM
                  </Tag>
                )}
              </div>
            }
          >
            <Text>{item.description}</Text>
          </Card>
        ))}
      </Card.Wrapper>
      <Suspense fallback={null}>
        <GithubContributions />
      </Suspense>
      <div ref={ref} />
    </div>
  );
};

export default WorkContent;
