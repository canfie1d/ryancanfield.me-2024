import Card from "../components/Card";
import styles from "../styles/content.module.scss";
import cardStyles from "../styles/card.module.scss";

const WritingContent = () => {
  return (
    <div className={styles.contentBody}>
      <h2 className={styles.h2}>Selected Medium Articles</h2>
      <div className={cardStyles.cardWrapper}>
        <Card
          title="Shopify React Scripts"
          href="https://medium.com/helpful-human/shopify-react-scripts-6e717791d7b4"
          className={styles.article}
          opensInNewPage
        >
          <h4 className={styles.h4}>
            Bespoke Shopify/React Projects in Minutes
          </h4>
        </Card>
        <Card
          title="Improving Teamwork through Knowledge Sharing"
          href="https://medium.com/helpful-human/improving-teamwork-through-knowledge-sharing-e3c6d53e6409"
          className={styles.article}
          opensInNewPage
        >
          <h4 className={styles.h4}>Internal meetings for team unity</h4>
        </Card>
        <Card
          title="SVG icon sets in React with Rollup"
          href="https://medium.com/helpful-human/svg-icon-sets-in-react-with-rollup-cd10be8206a5"
          className={styles.article}
          opensInNewPage
        >
          <h4 className={styles.h4}>
            Follow up to "Embedded SVG icon sets and Reactjs"
          </h4>
        </Card>
        <Card
          title="Improving User Consideration in Development"
          href="https://medium.com/helpful-human/improving-user-consideration-in-development-604a4ddeb6dd"
          className={styles.article}
          opensInNewPage
        >
          <h4 className={styles.h4}>
            While web designers consider end users throughout the design
            process, developers can get caught up in...
          </h4>
        </Card>
        <Card
          title="Creating a Custom, Maintainable React-Scripts Package"
          href="https://medium.com/helpful-human/creating-a-custom-maintainable-react-scripts-package-db6d16501a94"
          className={styles.article}
          opensInNewPage
        >
          <h4 className={styles.h4}>
            When Facebook released Create React App, I was excited to be able to
            harness their knowledge of the build...
          </h4>
        </Card>
        <Card
          title="Process & Method"
          href="https://medium.com/@Canfie1d/process-method-bddef9f5e47f"
          className={styles.article}
          opensInNewPage
        >
          <h4 className={styles.h4}>
            An adaptation from the speech I gave at Phoenix Design Week's Pecha
            Kucha talks.
          </h4>
        </Card>
        <Card
          title="Embedded SVG icon sets and Reactjs"
          href="https://medium.com/@Canfie1d/reactjs-and-embedded-svg-icons-1e6eed0dc16a"
          className={styles.article}
          opensInNewPage
        >
          <h4 className={styles.h4}>
            How I implemented icons at Synapse Studios
          </h4>
        </Card>
        <Card
          title="SMACSS/BEM edge case naming convention"
          href="https://medium.com/@Canfie1d/smacss-bem-edge-case-naming-convention-73be902b1d30"
          className={styles.article}
          opensInNewPage
        >
          <h4 className={styles.h4}>
            What do you do in cases where BEM methodology fails? What does the
            fallback naming convention look like?
          </h4>
        </Card>
      </div>
    </div>
  );
};

export default WritingContent;
