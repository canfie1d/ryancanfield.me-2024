import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { useGameModeStore } from "~/stores/game-mode";
import { getPageContent } from "~/lib/sanityQueries";
import Text from "~/components/Text";

const AboutGameContent = () => {
  const activeGameModes = useGameModeStore((store) => store.activeGameModes);

  const { data: pageContent } = useQuery({
    queryKey: ["sanity", "pageContent", "aboutGame"],
    queryFn: () => getPageContent("aboutGame"),
  });

  const content =
    pageContent?.introText ??
    `Welcome, noble wanderer, to the realm of **Eryndor**. You have passed through the threshold—the code has been spoken, the path has opened, and you stand now in a land of ancient magic and boundless wonder. Banners of gold and crimson flutter in the eternal breeze. The whispers of forgotten legends guide your path. Here, the very fabric of the realm is woven with secrets, and your quest is to unravel the mysteries hidden within its opulent halls and enchanted glades.

This is no ordinary journey. **Eryndor** is a living tapestry of discovery and triumph. Though you have already ventured far to reach it, the realm is vast, and its deepest secrets remain shrouded. There are more treasures to unearth, more [achievements](/work) to claim, and more tales to inscribe in the annals of your legacy.

## The Weaving of the Realm

The world of **Eryndor** was forged by hand by those who sought to create a realm where exploration and wonder reign supreme. Every stone, every banner, and every whispered secret was crafted to draw you deeper into its embrace. The threads of tradition woven into every corner, blending the familiar with the extraordinary.

As you traverse this realm, you will find that **Eryndor** is not merely a place—it is a living story, one that unfolds with every step you take. It is designed to inspire courage and curiosity, inviting you to uncover its hidden depths and claim your place among its legends.`;

  return (
    <div className="contentBody">
      <ReactMarkdown
        components={{
          p: ({ children }) => <Text as="p">{children}</Text>,
          strong: ({ children }) => <strong>{children}</strong>,
          h2: ({ children }) => <h2>{children}</h2>,
          a: ({ href, children }) =>
            href?.startsWith("/") ?
              <Link to={activeGameModes.work ? href : "/404"}>{children}</Link>
            : <a
                href={href}
                target="_blank"
                rel="noreferrer"
              >
                {children}
              </a>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default AboutGameContent;
