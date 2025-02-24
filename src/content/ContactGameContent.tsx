import ContactGameForm from "~/components/Form/ContactGameForm";
import Text from "~/components/Text";

const ContactGameContent = () => {
  return (
    <div className="contentBody">
      <Text style={{ maxWidth: "45ch", textAlign: "center", margin: "auto" }}>
        If you encounter any issues with the game or have feedback, I'd love to
        hear about it! It's valuable to me because it helps me improve the game
        and provide a better experience for other players. Thank you for the
        support!
      </Text>
      <ContactGameForm />
    </div>
  );
};

export default ContactGameContent;
