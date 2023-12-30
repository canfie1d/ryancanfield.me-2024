import { CASE_STUDIES } from "../data/content";
import styles from "../styles/content.module.scss";

const CaseStudy = ({ id }: { id: string }) => {
  const study = CASE_STUDIES.find((item) => item.id === id);

  if (!study) return null;

  return (
    <div className={styles.contentBody}>
      <h2 className={styles.h2}>{study.subtitle}</h2>
      <h3 className={styles.h3}>Problem Analysis</h3>
      {study.problem.content.map((paragraph, i) => (
        <p key={`paragraph-${i}`} className={styles.p}>
          {paragraph}
        </p>
      ))}
      {study.problem.images?.map((image, i) => (
        <img
          key={`image-${i}`}
          src={image.src}
          alt=""
          className={styles.caseStudyImage}
        />
      ))}

      <h3 className={styles.h3}>Solution</h3>
      {study.solution.content.map((paragraph, i) => (
        <p key={`paragraph-${i}`} className={styles.p}>
          {paragraph}
        </p>
      ))}
      {study.solution.images?.map((image, i) => (
        <img
          key={`image-${i}`}
          src={image.src}
          alt=""
          className={styles.caseStudyImage}
        />
      ))}

      <h3 className={styles.h3}>Result</h3>
      {study.result.content.map((paragraph, i) => (
        <p key={`paragraph-${i}`} className={styles.p}>
          {paragraph}
        </p>
      ))}
      {study.result.images?.map((image, i) => (
        <img
          key={`image-${i}`}
          src={image.src}
          alt=""
          className={styles.caseStudyImage}
        />
      ))}
    </div>
  );
};

export default CaseStudy;
