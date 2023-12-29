import { useState } from "react";
import styles from "../styles/content.module.scss";
import formStyles from "../styles/form.module.scss";

type FormData = {
  "form-name": string;
  name: string;
  email: string;
  message: string;
  [key: string]: string; // Add index signature
};

const encode = (data: FormData) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const ContactContent = () => {
  const [formData, setFormData] = useState<FormData>({
    "form-name": "contact",
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = () => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ ...formData }),
    })
      .then(() => alert("Success!"))
      .catch((error) => alert(error));
  };

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.contentBody}>
      <p className={styles.p}>
        I'm not seeking opportunites but I always like hearing from new (and
        familiar) people!
      </p>
      <form
        name="contact"
        data-netlify={true}
        netlify-honeypot="bot-field"
        hidden
      >
        <input type="text" name="name" />
        <input type="email" name="email" />
        <textarea name="message"></textarea>
      </form>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <input type="hidden" name="contact" value="contact" />
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
    </div>
  );
};

export default ContactContent;
