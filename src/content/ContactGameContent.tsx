import GameContentBody from "~/components/GameContentBody/GameContentBody";
import ContactGameForm from "~/components/Form/ContactGameForm";
import Text from "~/components/Text";
import { usePageContent } from "~/hooks/useSanityContent";

const ContactGameContent = () => {
  const { data: pageContent } = usePageContent("contactGame");
  const introText = pageContent?.introText ?? "";

  return (
    <GameContentBody>
      <Text style={{ maxWidth: "45ch", textAlign: "center", margin: "auto" }}>{introText}</Text>
      <ContactGameForm />
    </GameContentBody>
  );
};

export default ContactGameContent;
