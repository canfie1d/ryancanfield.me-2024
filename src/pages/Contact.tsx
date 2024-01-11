import PageContent from "../components/PageContent";
import ContactContent from "../content/ContactContent";
import At from "../icons/at.svg?react";

const Contact = () => {
  return (
    <>
      <PageContent
        pageName="contact"
        header={{
          meta: "④",
          title: "Contact",
          icon: <At />,
        }}
      >
        <ContactContent />
      </PageContent>
    </>
  );
};

export default Contact;
