import Card from "../components/Card";
import { ARTICLE_LINKS } from "../data/content";
import styles from "../styles/content.module.scss";
import cardStyles from "../styles/card.module.scss";

const WritingContent = () => {
  return (
    <div className={styles.contentBody}>
      <p className={styles.p}>
        Although I don't have as many opportunities to write as I'd like, I do
        have a few articles that I've written that I'm proud of. Here are a few
        of my favorites:
      </p>
      <h2 className={styles.h2}>selected articles</h2>
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
            <p className={styles.p}>{article.description}</p>
            <div className={styles.tag}>{article.length}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WritingContent;
