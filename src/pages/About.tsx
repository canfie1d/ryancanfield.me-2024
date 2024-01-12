import PageContent from "../components/PageContent";
import AboutContent from "../content/AboutContent";
import Atom from "../icons/atom.svg?react";
import { useScroll } from "react-use";
import { usePageScrollContext } from "../contexts/PageScrollProvider";
import { useRef } from "react";

const About = () => {
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
      pageName="about"
      header={{
        meta: "①",
        title: "About",
        icon: <Atom />,
      }}
    >
      <AboutContent />
    </PageContent>
  );
};

export default About;
