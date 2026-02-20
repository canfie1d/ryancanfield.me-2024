declare global {
  interface Window {
    wait: (ms: number) => Promise<void>;
    lore: () => string;
    yes: () => void;
    no: () => string;
  }
}

import { useEffect, useRef, memo } from "react";
import { useAchievementStore } from "~/stores/achievements";
import { textFallOff } from "~/helpers/textFallOff";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import Tabs from "~/components/Tabs";
import Text from "~/components/Text";

const AboutContent = () => {
  const ref = useRef<HTMLPreElement>(null);
  const viewed = useRef<boolean>(false);

  const inView = useIntersectionObserver(ref?.current);

  useEffect(() => {
    // Allows the user to interact with
    // the site through the console.
    // @note Nesting functions controls the discoverability
    // of the functions on window unless they log the lore function w/o calling it
    // @todo Add more functions to interact with the site. Should this be more prominent throughout?
    // @todo Add achievements for interacting with the console.
    window.lore = () => {
      // No no don't look in here. It's just a bunch of boring stuff.
      // ${(<a href="https://github.com/canfie1d/ryancanfield.me-2024/blob/main/README.md">README</a>)}
      window.yes = () => {
        if (!hasAchievement("the_journey_begins")) {
          addAchievement("the_journey_begins");
        }
        console.log(
          "Oh good I was afraid you'd say no.\n\n https://github.com/canfie1d/ryancanfield.me-2024/blob/main/README.md"
        );
      };
      window.no = () => {
        return "Oh, um, okay. No, no, yeah I get it, I just didn't expec— no no yeah I'm super busy too soo.. next time for sure.";
      };

      return "You don't know how long this will take. Are you sure you want to continue? yes()? no()?";
    };
  }, []);

  useEffect(() => {
    if (ref.current) {
      if (inView && !viewed.current) {
        console.log(
          "I hope you're enjoying the site. I'm glad you've made it this far."
        );
      }
    }
  }, [inView]);

  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

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
      <Tabs pageName="about" options={options}>
        <div id="me">
          <h2>me</h2>
          <Text>
            I'm <strong>a software engineering manager</strong> based in Seattle
            and currently working at{" "}
            <a href="https://asmbl.digital/" target="_blank" rel="noreferrer">
              ASMBL
            </a>
            , a software consultancy where I lead a team of engineers building
            software for some of the largest companies in the world.
          </Text>
          <Text>
            Although I have{" "}
            <strong>a strong background in user interface design</strong>, I've
            focused my career on software development. I'm{" "}
            <strong>
              passionate about building products that make a positive
              impact&nbsp;
            </strong>
            on people's lives and environments - being mindful of equity,
            accessibility, global impact and sustainability.
          </Text>
          <Text>
            Outside of work, I really enjoy skateboarding, woodworking (poorly)
            and wandering around a market with my family and a coffee in hand.
          </Text>
        </div>
        <div id="site">
          <h2>the site</h2>
          <Text>
            While perusing the analytics of previous iterations of this site (as
            one does), I found that many users only visited once. While
            confirming my assumption that portfolio sites (at least mine) don't
            have many repeat visitors, I felt that there{" "}
            <em>must be a better way</em>.
          </Text>
          <Text>
            By identifying the types of users who visited— developers,
            engineering managers, tech recruiters, and designers, I decided that
            because developers &amp; designers had the least to gain from
            interacting with and revisiting my site, adding a useful tool for
            them would create enough value for them (you?) to come back.
          </Text>
          <h3>theming</h3>
          <Text>
            This site includes a theming feature that enables the ability to
            switch between premade themes or create fully custom ones. Those
            themes can be taken and easily applied to other projects. The
            feature is built directly into the fabric of the website allowing
            for two simultaneous user journeys at once.
            <em>
              ...three if you have a little extra time on your hands— some say
              there is a hidden theme to be found...
            </em>
          </Text>
          <Text>
            To assist with theme generation, I've included an API from{" "}
            <a href="http://colormind.io" target="_blank" rel="noreferrer">
              colormind.io
            </a>
            . The API generates unique and cohesive color palettes and can also
            generate palettes that are influenced by providing your own colors.
          </Text>
          <h3>motion</h3>
          <Text>
            I utilized the popular and powerful <s>Framer</s> Motion animation
            library to add smooth and engaging animations throughout the site. I
            wanted to take a departure from your run of the mill portfolio site
            and create a more interactive and engaging experience. I mean, how
            satisfying is that scroll animation?
          </Text>
          <Text>
            And for users that have a preference for reduced motion, those
            animations are completely muted.
          </Text>
          <h3>features</h3>
          <Text>
            The{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/canfie1d/ryancanfield.me-2024"
            >
              codebase of my site
            </a>{" "}
            reflects the entire spectrum of modern JavaScript and React
            features. From the latest React hooks (and some custom ones), to the
            latest CSS selectors and properties, you'll find a diverse set of
            techniques and best practices implemented. Don't get me wrong, I
            don't always try to jam every cool new thing into every project, but
            if not here, where?
          </Text>
          <Text>
            You'll also find that the site is fully accessible (if not, please{" "}
            <a href="/contact">reach out</a>). I'd love to develop colorblind
            color support into the site's theming feature. Enabling people to
            create themes easily could inspire them to add colorblind theme
            support to their own projects as well.
          </Text>
          <Text>
            I wrote this website in a time when I wasn't seeking a job so in its
            function as a portfolio, as a record of my work history, you'll find
            it falls pretty flat. However, for that you can download{" "}
            <a href="my-resume">my resume</a>
            <Text as="span" size="small">
              &nbsp;(don't click that yet)
            </Text>
            , if you like.
            <Text>
              Finally, this site is a labor of love. I've rewritten it in some
              capacity for something like 8 years running but I have less time
              than I used to, and I know that the streak may end. With that, I
              wanted to write something that would have some longevity -
              something that has the potential to have many iterations and new
              features over time.&nbsp;
              {textFallOff(
                "Sorry, one last thing while I have you. I thought I'd dangle a small bit of bait.",
                9
              )}
            </Text>
          </Text>
          <code className="inlineBlock" ref={ref}>
            Type <kbd>lore()</kbd> in the console, for a little nibble
          </code>
        </div>
      </Tabs>
    </div>
  );
};

export default memo(AboutContent);
