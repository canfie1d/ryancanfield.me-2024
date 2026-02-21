import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAchievementStore } from "~/stores/achievements";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import ContactForm from "~/components/Form/ContactForm";
import Text from "~/components/Text";
import { getColorsFromTheme } from "~/helpers/getColorsFromTheme";
import { getPageContent } from "~/lib/sanityQueries";

const ContactContent = () => {
  const viewed = useRef<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useIntersectionObserver(ref?.current);
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const { textColor } = getColorsFromTheme("contact");

  const { data: pageContent } = useQuery({
    queryKey: ["sanity", "pageContent", "contact"],
    queryFn: () => getPageContent("contact"),
  });

  useEffect(() => {
    if (!hasAchievement("reach_out") && inView && !viewed.current) {
      addAchievement("reach_out");
    }
  }, [inView]);

  const introText =
    pageContent?.introText ??
    "I'm not seeking opportunites but I always like hearing from new (and familiar) people!";

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
