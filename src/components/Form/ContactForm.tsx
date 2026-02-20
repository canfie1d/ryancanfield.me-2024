import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAchievementStore } from "~/stores/achievements";
import Button from "~/components/Button";
import Text from "~/components/Text";
import styles from "./Form.module.scss";

type FormData = {
  "form-name": string;
  name: string;
  email: string;
  message: string;
  [key: string]: string; // Add index signature
};

const DEFAULT_FORM_DATA: FormData = {
  "form-name": "contact",
  name: "",
  email: "",
  message: "",
};

const ContactForm = () => {
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  const formData = useRef(DEFAULT_FORM_DATA);
  const { search } = useLocation();
  const formSuccess = search.includes("success=true");

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    formData.current = { ...formData.current, [name]: value };
  };

  useEffect(() => {
    if (formSuccess && !hasAchievement("first_contact")) {
      addAchievement("first_contact");
    }
  }, [formSuccess]);

  if (formSuccess) {
    <Text className={classNames(styles.submitMessage)}>
      Thanks for reaching out! I'll get back to you as soon as possible.
    </Text>;
  }

  return (
    <form
      className={styles.form}
      name="contact"
      method="post"
      action="/contact?success=true"
    >
      <input type="hidden" name="form-name" value="contact" />
      <label className={styles.label} htmlFor="name">
        Name
      </label>
      <input
        className={styles.input}
        id="name"
        type="text"
        name="name"
        autoComplete="name"
        onChange={handleChange}
        value={formData.current.name}
      />
      <label className={styles.label} htmlFor="email">
        Email Address
      </label>
      <input
        id="email"
        className={styles.input}
        type="email"
        name="email"
        autoComplete="email"
        onChange={handleChange}
        value={formData.current.email}
      />
      <label className={styles.label} htmlFor="message">
        Message
      </label>
      <textarea
        id="message"
        className={styles.textarea}
        name="message"
        onChange={handleChange}
        value={formData.current.message}
      />
      <Button pageName="contact" type="submit">
        <span>Send</span>
      </Button>
    </form>
  );
};

export default ContactForm;
