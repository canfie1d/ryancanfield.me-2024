import PageContent from "../components/PageContent";
import WritingContent from "../content/WritingContent";
import Brain from "../icons/brain.svg?react";
import { useScroll } from "react-use";
import { usePageScrollContext } from "../contexts/PageScrollProvider";
import { useRef } from "react";

const Writing = () => {
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
    <div ref={ref}>
      <PageContent
        pageName="writing"
        header={{ meta: "③", title: "Writing", icon: <Brain /> }}
      >
        <WritingContent />
      </PageContent>
    </div>
  );
};

export default Writing;
