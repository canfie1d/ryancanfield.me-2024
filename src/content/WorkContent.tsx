import Card from "../components/Card";
import cardStyles from "../styles/card.module.scss";
import styles from "../styles/content.module.scss";

const WorkContent = () => {
  return (
    <div className={styles.contentBody}>
      <h2 className={styles.h2}>Case Studies</h2>
      <p className={styles.p}>
        While most of my work is either behind a login or under NDA, I do have a
        few case studies available:
      </p>
      <div className={cardStyles.cardWrapper}>
        <Card
          title="Freightweb Logistics"
          href="freightweb"
          className={styles.caseStudy}
        >
          <h4 className={styles.h4}>Automated Freight Sourcing & Matching.</h4>
          <div className={styles.tag}>UI/UX Design</div>
          <div className={styles.tag}>Frontend Development</div>
        </Card>
        <Card
          title="Carnival Ocean Compass"
          href="carnival"
          className={styles.caseStudy}
        >
          <h4 className={styles.h4}>
            A reimagined Caribbean cruise experience.
          </h4>
          <div className={styles.tag}>UI Design</div>
          <div className={styles.tag}>Frontend Development</div>
        </Card>
        <Card
          title="Xinova Innovator Platform"
          href="xinova"
          className={styles.caseStudy}
        >
          <h4 className={styles.h4}>Networking platform for inventors.</h4>
          <div className={styles.tag}>Frontend Development</div>
        </Card>
      </div>
    </div>
  );
};

export default WorkContent;
