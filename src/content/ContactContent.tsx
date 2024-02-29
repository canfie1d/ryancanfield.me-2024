import { useEffect, useRef } from "react";
import { useAchievementContext } from "../contexts/AchievementProvider";
import { isElementInViewport } from "../helpers/isElementInViewport";
import ContactForm from "../components/Form/ContactForm";

const ContactContent = () => {
  const viewed = useRef<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = isElementInViewport(ref?.current);

  const { hasAchievement, addAchievement } = useAchievementContext();

  useEffect(() => {
    if (!hasAchievement("") && inView && !viewed.current) {
      addAchievement("");
    }
  }, [inView]);

  return (
    <div className="contentBody">
      <p style={{ maxWidth: "35ch", textAlign: "center", margin: "auto" }}>
        I'm not seeking opportunites but I always like hearing from new (and
        familiar) people!
      </p>
      <ContactForm />
      <div ref={ref} />
    </div>
  );
};

export default ContactContent;
