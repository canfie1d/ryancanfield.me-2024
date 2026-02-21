declare global {
  interface Window {
    wait: (ms: number) => Promise<void>;
    lore: () => string;
    yes: () => void;
    no: () => string;
  }
}

import { useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { useAchievementStore } from "~/stores/achievements";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import Tabs from "~/components/Tabs";
import Text from "~/components/Text";
import { getPageContent } from "~/lib/sanityQueries";

const AboutContent = () => {
  const ref = useRef<HTMLPreElement>(null);
  const viewed = useRef<boolean>(false);

  const inView = useIntersectionObserver(ref?.current);

  const { data: pageContent } = useQuery({
    queryKey: ["sanity", "pageContent", "about"],
    queryFn: () => getPageContent("about"),
  });

  useEffect(() => {
    window.lore = () => {
      window.yes = () => {
        if (!hasAchievement("the_journey_begins")) {
          addAchievement("the_journey_begins");
        }
        console.log(
          "Oh good I was afraid you'd say no.\n\n https://github.com/canfie1d/ryancanfield.me-2024/blob/main/README.md",
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
        console.log("I hope you're enjoying the site. I'm glad you've made it this far.");
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

  const sections = pageContent?.sections ?? [
    {
      id: "me",
      title: "me",
      content:
        "I'm **a software engineering manager** based in Seattle and currently working at [ASMBL](https://asmbl.digital/), a software consultancy where I lead a team of engineers building software for some of the largest companies in the world.\n\nAlthough I have **a strong background in user interface design**, I've focused my career on software development. I'm **passionate about building products that make a positive impact** on people's lives and environments - being mindful of equity, accessibility, global impact and sustainability.\n\nOutside of work, I really enjoy skateboarding, woodworking (poorly) and wandering around a market with my family and a coffee in hand.",
    },
    {
      id: "site",
      title: "the site",
      content:
        "While perusing the analytics of previous iterations of this site (as one does), I found that many users only visited once. While confirming my assumption that portfolio sites (at least mine) don't have many repeat visitors, I felt that there *must be a better way*.\n\nBy identifying the types of users who visited— developers, engineering managers, tech recruiters, and designers, I decided that because developers & designers had the least to gain from interacting with and revisiting my site, adding a useful tool for them would create enough value for them (you?) to come back.\n\n### theming\n\nThis site includes a theming feature that enables the ability to switch between premade themes or create fully custom ones. Those themes can be taken and easily applied to other projects. The feature is built directly into the fabric of the website allowing for two simultaneous user journeys at once. *...three if you have a little extra time on your hands— some say there is a hidden theme to be found...*\n\nTo assist with theme generation, I've included an API from [colormind.io](http://colormind.io). The API generates unique and cohesive color palettes and can also generate palettes that are influenced by providing your own colors.\n\n### motion\n\nI utilized the popular and powerful ~~Framer~~ Motion animation library to add smooth and engaging animations throughout the site. I wanted to take a departure from your run of the mill portfolio site and create a more interactive and engaging experience. I mean, how satisfying is that scroll animation?\n\nAnd for users that have a preference for reduced motion, those animations are completely muted.\n\n### features\n\nThe [codebase of my site](https://github.com/canfie1d/ryancanfield.me-2024) reflects the entire spectrum of modern JavaScript and React features. From the latest React hooks (and some custom ones), to the latest CSS selectors and properties, you'll find a diverse set of techniques and best practices implemented. Don't get me wrong, I don't always try to jam every cool new thing into every project, but if not here, where?\n\nYou'll also find that the site is fully accessible (if not, please [reach out](/contact)). I'd love to develop colorblind color support into the site's theming feature. Enabling people to create themes easily could inspire them to add colorblind theme support to their own projects as well.\n\nI wrote this website in a time when I wasn't seeking a job so in its function as a portfolio, as a record of my work history, you'll find it falls pretty flat. However, for that you can download [my resume](my-resume) (don't click that yet), if you like.\n\nFinally, this site is a labor of love. I've rewritten it in some capacity for something like 8 years running but I have less time than I used to, and I know that the streak may end. With that, I wanted to write something that would have some longevity - something that has the potential to have many iterations and new features over time.\n\nSorry, one last thing while I have you. I thought I'd dangle a small bit of bait. Type `lore()` in the console, for a little nibble.",
    },
  ];

  const options = sections.map((s: { id: string; title: string }) => ({
    id: s.id,
    label: s.title,
  }));

  return (
    <div className="contentBody">
      <Tabs
        pageName="about"
        options={options}
      >
        {sections.map((section: { id: string; title: string; content?: string }) => (
          <div
            key={section.id}
            id={section.id}
          >
            <h2>{section.title}</h2>
            {section.content ?
              <div className="markdownContent">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <Text>{children}</Text>,
                    strong: ({ children }) => <strong>{children}</strong>,
                    em: ({ children }) => <em>{children}</em>,
                    a: ({ href, children }) =>
                      href?.startsWith("/") ?
                        <Link to={href}>{children}</Link>
                      : <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {children}
                        </a>,
                  }}
                >
                  {section.content}
                </ReactMarkdown>
              </div>
            : null}
            {section.id === "site" && (
              <code
                className="inlineBlock"
                ref={ref}
              >
                Type <kbd>lore()</kbd> in the console, for a little nibble
              </code>
            )}
          </div>
        ))}
      </Tabs>
    </div>
  );
};

export default memo(AboutContent);
