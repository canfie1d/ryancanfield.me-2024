import { useEffect, useRef } from "react";
import { useAchievementStore } from "~/stores/achievements";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import { usePageContent } from "~/hooks/useSanityContent";
import ContactForm from "~/components/Form/ContactForm";
import Text from "~/components/Text";
import { useGetColorsFromTheme } from "~/helpers/getColorsFromTheme";

const ContactContent = () => {
  const viewed = useRef<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useIntersectionObserver(ref?.current);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const { textColor } = useGetColorsFromTheme("contact");
  const { data: pageContent } = usePageContent("contact");

  useEffect(() => {
    if (!hasAchievement("reach_out") && inView && !viewed.current) {
      addAchievement("reach_out");
    }
  }, [inView, addAchievement, hasAchievement]);

  const introText = pageContent?.introText ?? "";

  return (
    <div className="contentBody">
      <Text
        color={textColor}
        style={{
          maxWidth: "35ch",
          textAlign: "center",
          margin: "auto",
        }}
      >
        {introText}
      </Text>
      <ContactForm />
      <div ref={ref} />
    </div>
  );
};

export default ContactContent;
