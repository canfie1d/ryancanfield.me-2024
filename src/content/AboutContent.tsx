import styles from "../styles/content.module.scss";

const AboutContent = () => {
  return (
    <div className={styles.contentBody}>
      <p className={styles.p}>
        I'm a software engineering manager based in Seattle. I'm currently
        working at{" "}
        <a
          className={styles.a}
          href="https://asmbl.digital/"
          rel="noopener noreferrer"
          target="_blank"
        >
          ASMBL
        </a>{" "}
        on the custom solutions team.
      </p>
      <p className={styles.p}>
        Although I graduated with a degree in graphic design, I've focused my
        career in software development. I'm passionate about building products
        that make a positive impact on people's lives- being mindful of equity,
        accessibility, globalism and sustainability.
      </p>
      <p className={styles.p}>
        Outside of work, I really enjoy skateboarding, woodworking (poorly), and
        tinkering in my workshop (its like inventing but you never actually make
        anything novel).
      </p>
    </div>
  );
};

export default AboutContent;
