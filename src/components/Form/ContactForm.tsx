import classNames from "classnames";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAchievementContext } from "../../contexts/AchievementProvider";
import Button from "../../components/Button";
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
  const { hasAchievement, addAchievement } = useAchievementContext();

  const { search } = useLocation();
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);
  const formSuccess = search.includes("success=true");
  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (formSuccess && !hasAchievement("first_contact")) {
      addAchievement("first_contact");
    }
  }, [formSuccess]);

  if (formSuccess) {
    <p className={classNames(styles.p, styles.submitMessage)}>
      Thanks for reaching out! I'll get back to you as soon as possible.
    </p>;
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
        value={formData.name}
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
        value={formData.email}
      />
      <label className={styles.label} htmlFor="message">
        Message
      </label>
      <textarea
        id="message"
        className={styles.textarea}
        name="message"
        onChange={handleChange}
        value={formData.message}
      />
      <Button type="submit">
        <span>Send</span>
      </Button>
    </form>
  );
};

export default ContactForm;
