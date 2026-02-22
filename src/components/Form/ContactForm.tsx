import classNames from "classnames";
import { useEffect, useState } from "react";
import { useAchievementStore } from "~/stores/achievements";
import { useInventoryStore } from "~/stores/inventory";
import { useUiStrings } from "~/hooks/useSanityContent";
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
  const addItem = useInventoryStore((store) => store.addItem);
  const hasItem = useInventoryStore((store) => store.hasItem);
  const { data: ui } = useUiStrings();

  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);
  const formSuccess =
    typeof window !== "undefined" && window.location.search.includes("success=true");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (formSuccess) {
      if (!hasAchievement("first_contact")) {
        addAchievement("first_contact");
      }
      if (!hasItem("jewel-contact")) {
        addItem("jewel-contact");
      }
    }
  }, [formSuccess, addAchievement, addItem, hasAchievement, hasItem]);

  if (formSuccess) {
    return <Text className={classNames(styles.submitMessage)}>{ui?.formSuccessMessage ?? ""}</Text>;
  }

  return (
    <form
      className={styles.form}
      name="contact"
      method="post"
      action="/contact?success=true"
    >
      <input
        type="hidden"
        name="form-name"
        value="contact"
      />
      <label
        className={styles.label}
        htmlFor="name"
      >
        {ui?.formLabelName ?? ""}
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
      <label
        className={styles.label}
        htmlFor="email"
      >
        {ui?.formLabelEmail ?? ""}
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
      <label
        className={styles.label}
        htmlFor="message"
      >
        {ui?.formLabelMessage ?? ""}
      </label>
      <textarea
        id="message"
        className={styles.textarea}
        name="message"
        onChange={handleChange}
        value={formData.message}
      />
      <Button
        pageName="contact"
        type="submit"
      >
        <span>{ui?.formButtonSend ?? ""}</span>
      </Button>
    </form>
  );
};

export default ContactForm;
