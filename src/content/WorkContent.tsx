import { useEffect, useRef } from "react";
import { useAchievementStore } from "~/stores/achievements";
import { OPEN_SOURCE, PROJECTS } from "~/data/content";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import GithubContributions from "~/components/GithubContributions";
import Card from "~/components/Card/Card";
import Text from "~/components/Text";
import Tag from "~/components/Tag";
import styles from "./PageContent.module.scss";
import { getColorsFromTheme } from "~/helpers/getColorsFromTheme";

const WorkContent = () => {
  const viewed = useRef<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useIntersectionObserver(ref?.current);
  const { textColor, backgroundColor } = getColorsFromTheme("work");
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
        Portfolio sites often showcase the work that was performed without
        providing additional context for the thinking that led to that outcome.
        These case studies break down my understanding of the problem that the
        software should attempt to solve, how I think about turning business
        objectives into user value, and the result of that work.
      </Text>
      <Text>
        While most of my work is either behind a login or under NDA, I do have a
        few case studies available. I've also included a few open source
        projects that I created and maintain, or have in the past.
      </Text>
      <Card.Wrapper>
        {PROJECTS.map((project, i) => (
          <Card
            pageName="work"
            key={`project-${i}`}
            title={project.title}
            href={project.url}
            className={styles.caseStudy}
            footer={
              <div>
                {project.tags.length &&
                  project.tags.map((tag, i) => (
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
            <img src={project.image} alt="" />
            <Text size="small">{project.description}</Text>
          </Card>
        ))}
      </Card.Wrapper>
      <h3>open source</h3>
      <Card.Wrapper>
        {OPEN_SOURCE.map((item, i) => (
          <Card
            pageName="work"
            key={`item-${i}`}
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
        ))}
      </Card.Wrapper>
      <GithubContributions />
      <div ref={ref} />
    </div>
  );
};

export default WorkContent;
