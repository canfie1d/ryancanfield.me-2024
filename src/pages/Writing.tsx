import PageContent from "../components/PageContent";
import WritingContent from "../content/WritingContent";
import Brain from "../icons/brain.svg?react";

const Writing = () => {
  return (
    <>
      <PageContent
        pageName="writing"
        header={{ meta: "③", title: "Writing", icon: <Brain /> }}
      >
        <WritingContent />
      </PageContent>
    </>
  );
};

export default Writing;
