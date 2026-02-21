import { useEffect, useRef, memo } from "react";

declare global {
  interface Window {
    wait: (ms: number) => Promise<void>;
    lore: () => string;
    yes: () => void;
    no: () => string;
    help: () => void;
    achievements: () => void;
    look: () => string;
    go: () => string;
    inventory: () => string;
  }
}

import { useAchievementStore } from "~/stores/achievements";
import { useInventoryStore } from "~/stores/inventory";
import { textFallOff } from "~/helpers/textFallOff";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import Tabs from "~/components/Tabs";
import Text from "~/components/Text";

const AboutContent = () => {
  const ref = useRef<HTMLPreElement>(null);
  const viewed = useRef<boolean>(false);

  const inView = useIntersectionObserver(ref?.current);

  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const achievements = useAchievementStore((store) => store.achievements);

  useEffect(() => {
    // Console functions for curious visitors.
    window.lore = () => {
      window.yes = () => {
        if (!hasAchievement("the_journey_begins")) {
          addAchievement("the_journey_begins");
        }
        // Expose discoverable sub-functions after saying yes
        window.look = () =>
          "You see a long road ahead. It winds through forest and fog.";
        window.go = () => {
          if (!hasAchievement("wanderer")) {
            addAchievement("wanderer");
          }
          return "You set off down the road.";
        };
        window.inventory = () => {
          const { addItem, hasItem } = useInventoryStore.getState();
          if (!hasItem("key")) {
            addItem("key");
            return "Something cold and metallic finds its way into your pocket. A key.";
          }
          const { items, getItem } = useInventoryStore.getState();
          if (items.length === 0) return "Your pockets are empty. For now.";
          const names = items.map((id) => getItem(id)?.name ?? id).join(", ");
          return `You carry: ${names}. Open your inventory to use them.`;
        };

        console.log(
          "Oh good I was afraid you'd say no.\n\n https://github.com/canfie1d/ryancanfield.me-2024/blob/main/README.md"
        );
      };
      window.no = () => {
        return "Oh, um, okay. No, no, yeah I get it, I just didn't expec— no no yeah I'm super busy too soo.. next time for sure.";
      };

      return "You don't know how long this will take. Are you sure you want to continue? yes()? no()?";
    };

    window.help = () => {
      console.log(
        [
          "Available console functions:",
          "  lore()         — Start the lore experience",
          "  achievements() — List your collected achievements",
          "  help()         — Show this message",
        ].join("\n")
      );
      if (!hasAchievement("finders_keepers")) {
        addAchievement("finders_keepers");
      }
    };

    window.achievements = () => {
      const collected = achievements.filter((a) => a.collectedDate);
      if (collected.length === 0) {
        console.log("No achievements collected yet. Keep exploring!");
      } else {
        console.log(
          `Achievements (${collected.length}):\n` +
            collected
              .map((a) => `  [${a.icon}] ${a.title} — ${a.description}`)
              .join("\n")
        );
      }
      if (!hasAchievement("finders_keepers")) {
        addAchievement("finders_keepers");
      }
    };

    window.wait = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
  }, [hasAchievement, addAchievement, achievements]);

  useEffect(() => {
    if (ref.current) {
      if (inView && !viewed.current) {
        if (!hasAchievement("the_journey_begins")) {
          addAchievement("the_journey_begins");
        }
        console.log(
          "I'm glad you've made it this far. I hope you're enjoying the site."
        );
      }
    }
  }, [inView]);

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
            After reviewing the analytics of previous iterations of this site, I
            found that many users only visited once. While confirming my
            assumption that portfolio sites don't have many unique repeat
            visitors, I felt that there <em>must</em> be a way to improve that
            metric for <em>this</em> site.
          </Text>
          <Text>
            By identifying the types of users who visited— developers,
            engineering managers, tech recruiters, and designers. I decided that
            because developers &amp; designers had the least to gain from
            interacting with and revisiting my site, adding a useful tool for
            them would create enough value for them(you?) to come back.
          </Text>
          <h3>theming</h3>
          <Text>
            This site includes a theming feature that enables the ability to
            switch between premade themes or create fully custom ones. Those
            themes can be taken and easily applied to other projects. The
            feature is built directly into the fabric of the website allowing
            two simultaneous user journeys.{" "}
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
          <h3>JavaScript, React, and CSS features</h3>
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
            Sorry, one last thing. I wrote this website in a time when I wasn't
            seeking a job so in its function as a portfolio, as a record of my
            work history, you'll find it falls pretty flat. However, for that
            you can download <a href="/resume.pdf">my resume</a>, if you like.
          </Text>
          <h2>meta</h2>
          <Text>
            {textFallOff(
              "This site is a bit meta in that some times I talk to the reader and others refer to the site itself. And what's a good meta without a little little lore?",
              9
            )}
          </Text>
          <code className="inlineBlock" ref={ref}>
            Type lore() in the console
          </code>
        </div>
      </Tabs>
    </div>
  );
};

export default memo(AboutContent);
