import classNames from "classnames";
import styles from "../styles/content.module.scss";

const AboutContent = () => {
  return (
    <div className={styles.contentBody}>
      <h2>the site</h2>
      <p className={styles.p}>
        After reviewing the site analytics of my previous website iterations, I
        noticed that many users only visited one time. That result aligned with
        my general assumption that portfolio sites don't have frequent
        non-unique visitors, but I thought that there must be a way to improve
        that statistic for myself and my site.
      </p>
      <p className={styles.p}>
        I began by thinking of the type of users that might be visiting my
        website— developers, engineering managers, tech recruiters, and
        designers. I decided that because developers &amp; designers had the
        least to gain from interacting with and revisiting my site, adding some
        tooling for them would create value for them (you) to come back.
      </p>
      <ul className={styles.featuresList}>
        <li>
          <h3>theming</h3>
          <p className={styles.p}>
            This site includes a theming feature that enables the ability to
            switch between premade themes or create fully custom themes that can
            easily be applied to other projects. The feature is built directly
            into the fabric of the website enabling it to be utilized in two
            completely separate ways.
          </p>
          <p className={styles.p}>
            To assist with theme generation, I've included an API from{" "}
            <a href="colormind.io" target="_blank">
              colormind.io
            </a>
            . This API generates color palettes based on provided colors or, if
            none are provided, at random.
          </p>
        </li>
        <li>
          <h3>motion</h3>
          <p className={styles.p}>
            I have utilized Framer Motion, a powerful animation library for
            React, to add smooth and engaging animations throughout the site,
            creating a more interactive and engaging experience (I mean, how
            satisfying is that scroll animation?).
          </p>
          <p className={styles.p}>
            And of course, for users that have a preference for reduced motion,
            those animations are completely muted.
          </p>
        </li>
        <li>
          <h3>JavaScript, React, and CSS features</h3>
          <p className={styles.p}>
            The{" "}
            <a
              target="_blank"
              href="https://github.com/canfie1d/ryancanfield.me-2024"
            >
              codebase of this site
            </a>{" "}
            reflects the entire spectum of modern JavaScript features from the
            latest React hooks (and some custom ones), latest CSS selectors and
            properties, you'll find a diverse set of techniques and best
            practices implemented.
          </p>
        </li>
      </ul>

      <h2>me</h2>
      <p className={styles.p}>
        I'm <strong>a software engineering manager</strong> based in Seattle and
        currently working at{" "}
        <a
          className={classNames(styles.a, styles.aInline)}
          href="https://asmbl.digital/"
          target="_blank"
        >
          ASMBL
        </a>
        , a software consultancy where I lead a team of engineers building
        software for some of the largest companies in the world.
      </p>
      <p className={styles.p}>
        Although I have <strong>a background in user interface design</strong>,
        I've focused my career in software development. I'm{" "}
        <strong>
          passionate about building products that make a positive impact&nbsp;
        </strong>
        on people's lives - being mindful of equity, accessibility, globalism
        and sustainability.
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
