import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);
  const formSuccess = search.includes("success=true");
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  useEffect(() => {
    if (formSuccess && !hasAchievement("first_contact")) {
      addAchievement("first_contact");
    }
  }, [formSuccess]);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };
  if (formSuccess) {
    <Text className={classNames(styles.p, styles.submitMessage)}>
      Thanks for the feedback! If applicable, I'll get back to you pretty
      soon-ish.
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
        User Name
      </label>
      <input
        className={styles.input}
        id="name"
        placeholder="undefined undefined"
        type="text"
        name="name"
        onChange={handleChange}
        value={formData.name}
      />
      <label className={styles.label} htmlFor="email">
        Email
      </label>
      <input
        id="email"
        className={styles.input}
        type="email"
        name="email"
        placeholder="undefined@undefined.com"
        onChange={handleChange}
        value={formData.email}
      />
      <label className={styles.label} htmlFor="message">
        Message
      </label>
      <textarea
        id="message"
        placeholder="undefined"
        className={styles.textarea}
        name="message"
        onChange={handleChange}
        value={formData.message}
      />
      <Button pageName="contact" type="submit">
        <span>Submit</span>
      </Button>
    </form>
  );
};

export default ContactGameForm;
