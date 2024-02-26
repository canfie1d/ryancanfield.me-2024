import { useEffect, useRef } from "react";
import { useAchievementContext } from "../contexts/AchievementProvider";
import { OPEN_SOURCE, PROJECTS } from "../data/content";
import { isElementInViewport } from "../helpers/isElementInViewport";
import GithubContributions from "../components/GithubContributions";
import Card from "../components/Card/Card";
import Tag from "../components/Tag";
import styles from "./PageContent.module.scss";

const WorkContent = () => {
  const viewed = useRef<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = isElementInViewport(ref?.current);

  const { hasAchievement, addAchievement } = useAchievementContext();

  useEffect(() => {
    if (!hasAchievement("") && inView && !viewed.current) {
      addAchievement("");
    }
  }, [inView]);

  return (
    <div className="contentBody">
      <p>
        Portfolio sites often showcase the work that was performed without
        providing additional context for the thinking that led to that outcome.
        These case studies break down my understanding of the problem that the
        software should attempt to solve, how I think about turning business
        objectives into user value, and the result of that work.
      </p>
      <p>
        While most of my work is either behind a login or under NDA, I do have a
        few case studies available. I've also included a few open source
        projects that I created and maintain, or have in the past.
      </p>
      <Card.Wrapper>
        {PROJECTS.map((project, i) => (
          <Card
            key={`project-${i}`}
            title={project.title}
            href={project.url}
            className={styles.caseStudy}
            footer={
              <div>
                {project.tags.length &&
                  project.tags.map((tag, i) => (
                    <Tag key={`tag-${i}`}>{tag}</Tag>
                  ))}
              </div>
            }
          >
            <img src={project.image} alt="" />
            <p>{project.description}</p>
          </Card>
        ))}
      </Card.Wrapper>
      <h3>open source</h3>
      <Card.Wrapper>
        {OPEN_SOURCE.map((item, i) => (
          <Card
            key={`item-${i}`}
            title={item.title}
            className={styles.caseStudy}
            footer={
              <div>
                {item.githubUrl && <Tag url={item.githubUrl}>Github</Tag>}
                {item.npmUrl && <Tag url={item.npmUrl}>NPM</Tag>}
              </div>
            }
          >
            <p>{item.description}</p>
          </Card>
        ))}
      </Card.Wrapper>
      <GithubContributions />
      <div ref={ref} />
    </div>
  );
};

export default WorkContent;
