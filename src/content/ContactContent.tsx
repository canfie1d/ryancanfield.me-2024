import { useState } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import styles from "../styles/content.module.scss";
import formStyles from "../styles/form.module.scss";

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

const ContactContent = () => {
  const { search } = useLocation();
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);
  const formSuccess = search.includes("success=true");
  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.contentBody}>
      <p
        style={{ maxWidth: "35ch", textAlign: "center", margin: "auto" }}
        className={styles.p}
      >
        I'm not seeking opportunites but I always like hearing from new (and
        familiar) people!
      </p>
      {formSuccess ? (
        <p className={classNames(styles.p, formStyles.submitMessage)}>
          Thanks for reaching out! I'll get back to you as soon as possible.
        </p>
      ) : (
        <>
          <form
            className={formStyles.form}
            name="contact"
            method="post"
            action="/contact?success=true"
          >
            <input type="hidden" name="form-name" value="contact" />
            <label className={formStyles.label} htmlFor="name">
              Name
            </label>
            <input
              className={formStyles.input}
              id="name"
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
            />
            <label className={formStyles.label} htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              className={formStyles.input}
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
            <label className={formStyles.label} htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              className={formStyles.textarea}
              name="message"
              onChange={handleChange}
              value={formData.message}
            ></textarea>
            <button className={formStyles.button} type="submit">
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ContactContent;
