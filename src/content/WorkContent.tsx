import { OPEN_SOURCE, PROJECTS } from "../data/content";
// import GithubContributions from "../components/GithubContributions";
import Card from "../components/Card";
import styles from "../styles/content.module.scss";
import cardStyles from "../styles/card.module.scss";

const WorkContent = () => {
  return (
    <div className={styles.contentBody}>
      <h2 className={styles.h2}>Case Studies</h2>
      <p className={styles.p}>
        While most of my work is either behind a login or under NDA, I do have a
        few case studies available:
      </p>
      <div className={cardStyles.cardWrapper}>
        {PROJECTS.map((project, i) => (
          <Card
            key={`project-${i}`}
            title={project.title}
            href={project.url}
            className={styles.caseStudy}
          >
            <img src={project.image} alt="" />
            <h4 className={styles.h4}>{project.description}</h4>
            <div className={styles.tag}>UI/UX Design</div>
            <div className={styles.tag}>Frontend Development</div>
          </Card>
        ))}
      </div>
      <h2 className={styles.h2}>Open Source</h2>
      <div className={cardStyles.cardWrapper}>
        {OPEN_SOURCE.map((item, i) => (
          <Card
            key={`item-${i}`}
            title={item.title}
            className={styles.caseStudy}
          >
            <h4 className={styles.h4}>{item.description}</h4>
            {item.githubUrl && (
              <div className={styles.tag}>
                <a href={item.githubUrl}>Github</a>
              </div>
            )}
            {item.npmUrl && (
              <div className={styles.tag}>
                <a href={item.npmUrl}>NPM</a>
              </div>
            )}
          </Card>
        ))}
      </div>
      {/* <GithubContributions /> */}
    </div>
  );
};

export default WorkContent;
