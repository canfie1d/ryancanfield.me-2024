import ContactGameForm from "~/components/Form/ContactGameForm";
import Text from "~/components/Text";

const ContactGameContent = () => {
  return (
    <div className="contentBody">
      <Text style={{ maxWidth: "45ch", textAlign: "center", margin: "auto" }}>
        Should you encounter any trials on your journey through Eryndor, or if
        you wish to share your thoughts on the realm, I would be honored to hear
        your tale.
      </Text>
      <Text style={{ maxWidth: "45ch", textAlign: "center", margin: "auto" }}>
        Your words are as revered as the starlit gems of Aeloria, for they
        guide the hands in refining the realm and ensuring it shines ever
        brighter for all who wander its paths. Your wisdom and support are the
        lifeblood of Eryndor, and for that, you have my deepest gratitude.
      </Text>
      <ContactGameForm />
    </div>
  );
};

export default ContactGameContent;
