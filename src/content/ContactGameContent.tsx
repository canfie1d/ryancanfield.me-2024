import { useQuery } from "@tanstack/react-query";
import ContactGameForm from "~/components/Form/ContactGameForm";
import Text from "~/components/Text";
import { getPageContent } from "~/lib/sanityQueries";

const ContactGameContent = () => {
  const { data: pageContent } = useQuery({
    queryKey: ["sanity", "pageContent", "contactGame"],
    queryFn: () => getPageContent("contactGame"),
  });

  const paragraphs =
    pageContent?.introText ?
      pageContent.introText.split("\n\n").filter(Boolean)
    : [
        "Should you encounter any trials on your journey through Eryndor, or if you wish to share your thoughts on the realm, I would be honored to hear your tale.",
        "Your words are as revered as the starlit gems of Aeloria, for they guide the hands in refining the realm and ensuring it shines ever brighter for all who wander its paths. Your wisdom and support are the lifeblood of Eryndor, and for that, you have my deepest gratitude.",
      ];

  return (
    <div className="contentBody">
      {paragraphs.map((text: string, i: number) => (
        <Text
          key={i}
          style={{ maxWidth: "45ch", textAlign: "center", margin: "auto" }}
        >
          {text}
        </Text>
      ))}
      <ContactGameForm />
    </div>
  );
};

export default ContactGameContent;
