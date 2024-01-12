import PageContent from "../components/PageContent";
import ContactContent from "../content/ContactContent";
import At from "../icons/at.svg?react";
import { useScroll } from "react-use";
import { usePageScrollContext } from "../contexts/PageScrollProvider";
import { useRef } from "react";

const Contact = () => {
  const ref = useRef(null);
  const { scrolled, setScrolled } = usePageScrollContext();
  const { y } = useScroll(ref);
  if (ref.current) {
    if ((scrolled === false || scrolled === undefined) && y > 50) {
      setScrolled(true);
    } else if (scrolled === true && y === 0) {
      setScrolled(false);
    }
  }

  return (
    <PageContent
      ref={ref}
      pageName="contact"
      header={{
        meta: "④",
        title: "Contact",
        icon: <At />,
      }}
    >
      <ContactContent />
    </PageContent>
  );
};

export default Contact;
