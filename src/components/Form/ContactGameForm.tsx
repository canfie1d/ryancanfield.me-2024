import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
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

const ContactGameForm = () => {
  const { search } = useLocation();
  const formData = useRef(DEFAULT_FORM_DATA);
  const formSuccess = search.includes("success=true");
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);
  const username = useAchievementStore((store) => store.username);

  useEffect(() => {
    formData.current = { ...formData.current, name: username };
  }, [username]);

  useEffect(() => {
    if (formSuccess && !hasAchievement("first_contact")) {
      addAchievement("first_contact");
    }
  }, [formSuccess]);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    formData.current = { ...formData.current, [name]: value };
  };
  if (formSuccess) {
    return (
      <Text className={classNames(styles.p, styles.submitMessage)}>
        Thanks for the feedback! If applicable, I'll get back to you pretty
        soon-ish.
      </Text>
    );
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
        Username
      </label>
      <input
        className={styles.input}
        id="name"
        type="text"
        name="name"
        onChange={handleChange}
        value={formData.current.name}
      />
      <label className={styles.label} htmlFor="email">
        Email
      </label>
      <input
        id="email"
        className={styles.input}
        type="email"
        name="email"
        placeholder="contactfrom@thefuture.com"
        onChange={handleChange}
        value={formData.current.email}
      />
      <label className={styles.label} htmlFor="message">
        Message
      </label>
      <textarea
        id="message"
        placeholder="Your words echo into the digital ether..."
        className={styles.textarea}
        name="message"
        onChange={handleChange}
        value={formData.current.message}
      />
      <Button pageName="contact" type="submit">
        <span>Release Pigeon</span>
      </Button>
    </form>
  );
};

export default ContactGameForm;
