import GameContentBody from "~/components/GameContentBody/GameContentBody";
import Text from "~/components/Text";
import { usePageContent } from "~/hooks/useSanityContent";

const AboutGameContent = () => {
  const { data: pageContent } = usePageContent("aboutGame");
  const introText = pageContent?.introText ?? "";
  const paragraphs = introText.split("\n\n").filter(Boolean);

  return (
    <GameContentBody>
      <div style={{ maxWidth: "52ch", margin: "auto" }}>
        {paragraphs.map((paragraph: string, i: number) => (
          <Text
            key={i}
            style={{
              textAlign: "center",
              marginBottom: i < paragraphs.length - 1 ? "1em" : 0,
            }}
          >
            {paragraph}
          </Text>
        ))}
      </div>
    </GameContentBody>
  );
};

export default AboutGameContent;
