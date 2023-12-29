import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useAnimate } from "../hooks/useAnimate";
import PagePreview from "../components/PagePreview";
import PageContent from "../components/PageContent";
import ContactContent from "../content/ContactContent";
import At from "../icons/at.svg?react";
import styles from "../styles/page.module.scss";
import classNames from "classnames";

const Contact = () => {
  const prefersReducedMotion = useReducedMotion();
  const { pathname } = useLocation();
  const pageName = "contact";
  const isCurrent = pathname === `/${pageName}`;
  const { slide } = useAnimate();
  return (
    <motion.div
      key={pageName}
      animate={!prefersReducedMotion && slide(pageName)}
      className={classNames(
        styles.pageWrapper,
        pathname === "/" && styles.pageWrapperHome
      )}
    >
      {isCurrent ? (
        <PageContent
          pageName={pageName}
          header={{
            meta: "④",
            title: "Contact",
            icon: <At />,
          }}
        >
          <ContactContent />
        </PageContent>
      ) : (
        <PagePreview pageName={pageName} />
      )}
    </motion.div>
  );
};

export default Contact;
