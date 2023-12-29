import styles from "../styles/content.module.scss";
import formStyles from "../styles/form.module.scss";

const ContactContent = () => {
  return (
    <div className={styles.contentBody}>
      <p className={styles.p}>
        I'm not seeking opportunites but I always like hearing from new (and
        familiar) people!
      </p>
      <form
        className={formStyles.form}
        name="contact"
        method="POST"
        data-netlify="true"
      >
        <label className={formStyles.label} htmlFor="name">
          Name
        </label>
        <input className={formStyles.input} id="name" type="text" name="name" />
        <label className={formStyles.label} htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          className={formStyles.input}
          type="email"
          name="email"
        />
        <label className={formStyles.label} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          className={formStyles.textarea}
          name="message"
        ></textarea>
        <button
          className={formStyles.button}
          style={{ display: "block", margin: "0 auto 1rem" }}
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactContent;
