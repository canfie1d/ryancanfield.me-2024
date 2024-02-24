import { useEffect, useRef } from "react";
import { useAchievementContext } from "../contexts/AchievementProvider";
import { textFallOff } from "../helpers/textFallOff";
import { isElementInViewport } from "../helpers/isElementInViewport";
import Tabs from "../components/Tabs";

const AboutContent = () => {
  const ref = useRef<HTMLPreElement>(null);
  const viewed = useRef<boolean>(false);

  const inView = isElementInViewport(ref?.current);

  useEffect(() => {
    if (ref.current) {
      if (inView && !viewed.current) {
        if (!hasAchievement("the_journey_begins")) {
          addAchievement("the_journey_begins");
        }
        console.log(
          "I'm glad you've made it this far. I hope you're enjoying the site. {{see README.md to get started...}}"
        );
      }
    }
  }, [inView]);

  const { hasAchievement, addAchievement } = useAchievementContext();

  useEffect(() => {
    if (!hasAchievement("about_face")) {
      addAchievement("about_face");
    }
  }, []);

  let options = [
    { id: "me", label: "me" },
    { id: "site", label: "the site" },
  ];

  return (
    <div className="contentBody">
      <Tabs options={options}>
        <div id="me">
          <h2>me</h2>
          <p>
            I'm <strong>a software engineering manager</strong> based in Seattle
            and currently working at{" "}
            <a href="https://asmbl.digital/" target="_blank">
              ASMBL
            </a>
            , a software consultancy where I lead a team of engineers building
            software for some of the largest companies in the world.
          </p>
          <p>
            Although I have{" "}
            <strong>a strong background in user interface design</strong>, I've
            focused my career on software development. I'm{" "}
            <strong>
              passionate about building products that make a positive
              impact&nbsp;
            </strong>
            on people's lives and environments - being mindful of equity,
            accessibility, global impact and sustainability.
          </p>
          <p>
            Outside of work, I really enjoy skateboarding, woodworking (poorly),
            and tinkering in my workshop.
          </p>
        </div>
        <div id="site">
          <h2>the site</h2>
          <p>
            After reviewing the analytics of previous iterations of this site, I
            found that many users only visited once. While aligning with my
            assumption that portfolio sites don't have many unique repeat
            visitors, I felt that there <em>must</em> be a way to improve that
            metric for <em>this</em> site.
          </p>
          <p>
            By identifying the types of users who visited— developers,
            engineering managers, tech recruiters, and designers. I decided that
            because developers &amp; designers had the least to gain from
            interacting with and revisiting my site, adding a useful tool for
            them would create enough value for them(you?) to come back.
          </p>
          <h3>theming</h3>
          <p>
            This site includes a theming feature that enables the ability to
            switch between premade themes or create fully custom ones. Those
            themes can be taken and easily applied to other projects. The
            feature is built directly into the fabric of the website allowing
            two simultaneous user journeys.{" "}
            <em>
              ...three if you have a little extra time on your hands- some say
              there are hidden themes to be found...
            </em>
          </p>
          <p>
            To assist with theme generation, I've included an API from{" "}
            <a href="colormind.io" target="_blank">
              colormind.io
            </a>
            . The API generates unique and cohesive color palettes and can also
            generate palettes that are influenced by providing your own colors.
          </p>
          <h3>motion</h3>
          <p>
            I utilized the popular and powerful Framer Motion animation library,
            to add smooth and engaging animations throughout the site. I wanted
            to take a departure from your run of the mill portfolio site and
            create a more interactive and engaging experience. I mean, how
            satisfying is that scroll animation?.
          </p>
          <p>
            And for users that have a preference for reduced motion, those
            animations are completely muted.
          </p>
          <h3>JavaScript, React, and CSS features</h3>
          <p>
            The{" "}
            <a
              target="_blank"
              href="https://github.com/canfie1d/ryancanfield.me-2024"
            >
              codebase of my site
            </a>{" "}
            reflects the entire spectum of modern JavaScript and React features.
            From the latest React hooks (and some custom ones), to latest CSS
            selectors and properties, you'll find a diverse set of techniques
            and best practices implemented. Don't get me wrong, I don't always
            try to jam every coll new thing into every project, but if not here,
            where?
          </p>
          <p>
            You'll also find that the site is fully accessible (if not, please{" "}
            <a href="/contact">reach out</a>.). I'd love to develop colorblind
            colors support into the site's theming feature. Enabling people to
            create themes easily could inspire them to add colorblind theme
            support to their own projects as well.
          </p>
          <p>
            Sorry, one last thing. I wrote this website in a time when I wasn't
            seeking a job so in its function as a portfolio, as a record of my
            work history, you'll find it falls pretty flat. However, for that
            you can download <a href="my resume">my resume</a>, if you like.
          </p>
          <h2>meta</h2>
          <p>
            {textFallOff(
              "This site is a bit meta in that some times I talk to the reader and others refer to the site itself. And what's a good meta without a little little lore?",
              9
            )}
          </p>
          <code className="inlineBlock" ref={ref}>
            console.log(lore)
          </code>
        </div>
      </Tabs>
    </div>
  );
};

export default AboutContent;
