import Card from "../components/Card";
import { ARTICLE_LINKS } from "../data/content";
import styles from "../styles/content.module.scss";
import cardStyles from "../styles/card.module.scss";

const WritingContent = () => {
  return (
    <div className={styles.contentBody}>
      <h2 className={styles.h2}>Selected Medium Articles</h2>
      <div className={cardStyles.cardWrapper}>
        {ARTICLE_LINKS.map((article, i) => (
          <Card
            key={`article-${i}`}
            title={article.title}
            href={article.url}
            className={styles.article}
            opensInNewPage
          >
            <img src={article.imageUrl} alt="" />
            <h4 className={styles.h4}>{article.description}</h4>
            <div className={styles.tag}>{article.length}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WritingContent;
