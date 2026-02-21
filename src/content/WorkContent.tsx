import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAchievementStore } from "~/stores/achievements";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import GithubContributions from "~/components/GithubContributions";
import Card from "~/components/Card/Card";
import Text from "~/components/Text";
import Tag from "~/components/Tag";
import styles from "./PageContent.module.scss";
import { getColorsFromTheme } from "~/helpers/getColorsFromTheme";
import { getProjects, getOpenSourceProjects, getPageContent } from "~/lib/sanityQueries";

const WorkContent = () => {
  const viewed = useRef<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useIntersectionObserver(ref?.current);
  const { textColor, backgroundColor } = getColorsFromTheme("work");
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  const { data: projects = [] } = useQuery({
    queryKey: ["sanity", "projects"],
    queryFn: getProjects,
  });

  const { data: openSource = [] } = useQuery({
    queryKey: ["sanity", "openSource"],
    queryFn: getOpenSourceProjects,
  });

  const { data: pageContent } = useQuery({
    queryKey: ["sanity", "pageContent", "work"],
    queryFn: () => getPageContent("work"),
  });

  useEffect(() => {
    if (!hasAchievement("writers_block") && inView && !viewed.current) {
      addAchievement("writers_block");
    }
  }, [inView]);

  const introParagraphs =
    pageContent?.introText ?
      pageContent.introText.split("\n\n").filter(Boolean)
    : [
        "Portfolio sites often showcase the work that was performed without providing additional context for the thinking that led to that outcome. These case studies break down my understanding of the problem that the software should attempt to solve, how I think about turning business objectives into user value, and the result of that work.",
        "While most of my work is either behind a login or under NDA, I do have a few case studies available. I've also included a few open source projects that I created and maintain, or have in the past.",
      ];

  return (
    <div className="contentBody">
      {introParagraphs.map((paragraph: string, i: number) => (
        <Text key={i}>{paragraph}</Text>
      ))}
      <Card.Wrapper>
        {projects.map(
          (project: {
            _id: string;
            title: string;
            url: string;
            link?: string;
            tags?: string[];
            description?: string;
            image?: string;
          }) => (
            <Card
              pageName="work"
              key={project._id}
              title={project.title}
              href={project.url}
              className={styles.caseStudy}
              footer={
                <div>
                  {project.tags?.length ?
                    project.tags.map((tag, i) => (
                      <Tag
                        textColor={textColor}
                        backgroundColor={backgroundColor}
                        key={`tag-${i}`}
                      >
                        {tag}
                      </Tag>
                    ))
                  : null}
                </div>
              }
            >
              {project.image && (
                <img
                  src={project.image}
                  alt=""
                />
              )}
              <Text size="small">{project.description}</Text>
            </Card>
          ),
        )}
      </Card.Wrapper>
      <h3>open source</h3>
      <Card.Wrapper>
        {openSource.map(
          (item: {
            _id: string;
            title: string;
            githubUrl?: string;
            npmUrl?: string;
            description?: string;
          }) => (
            <Card
              pageName="work"
              key={item._id}
              title={item.title}
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
          ),
        )}
      </Card.Wrapper>
      <GithubContributions />
      <div ref={ref} />
    </div>
  );
};

export default WorkContent;
