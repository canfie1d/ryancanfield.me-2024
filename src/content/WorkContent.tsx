import Card from "../components/Card";
import cardStyles from "../styles/card.module.scss";
import { OPEN_SOURCE, PROJECTS } from "../data/content";
import styles from "../styles/content.module.scss";
import { drawContributions } from "github-contributions-canvas";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import CircleX from "../icons/circle-x.svg?react";
import Modal from "../components/Modal";

const WorkContent = () => {
  const [ghLoading, setGhLoading] = useState(false);
  const canvasRef = useRef(null);

  const [ghData, setGhData] = useState<any>(null);
  useEffect(() => {
    if (canvasRef.current && ghData) {
      drawContributions(canvasRef.current, {
        data: ghData.data,
        username: "canfie1d",
        themeName: "standard",
        fontFace: "Nunito",
      });
    }
  }, [ghData]);

  const handleBonusClick = async () => {
    setGhLoading(true);
    try {
      const response = await fetch("/api/gh-contributions");

      const data = await response.json();
      setGhData(data);
    } catch (e) {
      console.error(e);
    }
    setGhLoading(false);
  };

  return (
    <div className={styles.contentBody}>
      {createPortal(
        <Modal
          show={!!ghData}
          header={
            <>
              <h2>GitHub Contributions</h2>
              <button className="hidden-button" onClick={() => setGhData(null)}>
                <CircleX />
              </button>
            </>
          }
        >
          <canvas ref={canvasRef} style={{ maxWidth: "100%" }} />
        </Modal>,
        document.body,
        "gh-data"
      )}
      <h2 className={styles.h2}>Case Studies</h2>
      <p className={styles.p}>
        While most of my work is either behind a login or under NDA, I do have a
        few case studies available:
      </p>
      <button onClick={handleBonusClick} disabled={ghLoading}>
        {ghLoading
          ? "Getting Latest Contributions from Github..."
          : "View Github Contributions"}
      </button>
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
    </div>
  );
};

export default WorkContent;
