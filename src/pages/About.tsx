import PageContent from "../components/PageContent";
import AboutContent from "../content/AboutContent";
import Atom from "../icons/atom.svg?react";

const About = () => {
  return (
    <>
      <PageContent
        pageName="about"
        header={{
          meta: "①",
          title: "About",
          icon: <Atom />,
        }}
      >
        <AboutContent />
      </PageContent>
    </>
  );
};

export default About;
