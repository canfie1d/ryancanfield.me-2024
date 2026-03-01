import classNames from "classnames";
import { useEffect, useState } from "react";
import { useAchievementStore } from "~/stores/achievements";
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

const ContactGameForm = () => {
  const { data: ui } = useUiStrings();

  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);
  const formSuccess =
    typeof window !== "undefined" && window.location.search.includes("success=true");
  const hasAchievement = useAchievementStore((store) => store.hasAchievement);
  const addAchievement = useAchievementStore((store) => store.addAchievement);

  useEffect(() => {
    if (formSuccess && !hasAchievement("first_contact")) {
      addAchievement("first_contact");
    }
  }, [formSuccess, addAchievement, hasAchievement]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };
  if (formSuccess) {
    return (
      <Text className={classNames(styles.p, styles.submitMessage)}>
        {ui?.formGameSuccessMessage ?? ""}
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
      <input
        type="hidden"
        name="form-name"
        value="contact"
      />
      <label
        className={styles.label}
        htmlFor="name"
      >
        {String(ui?.formGameLabelUserName ?? "")}
      </label>
      <input
        className={styles.input}
        id="name"
        placeholder={String(ui?.formGamePlaceholderName ?? "")}
        type="text"
        name="name"
        onChange={handleChange}
        value={formData.name}
      />
      <label
        className={styles.label}
        htmlFor="email"
      >
        {String(ui?.formLabelEmail ?? "")}
      </label>
      <input
        id="email"
        className={styles.input}
        type="email"
        name="email"
        placeholder={String(ui?.formGamePlaceholderEmail ?? "")}
        onChange={handleChange}
        value={formData.email}
      />
      <label
        className={styles.label}
        htmlFor="message"
      >
        {String(ui?.formLabelMessage ?? "")}
      </label>
      <textarea
        id="message"
        placeholder={String(ui?.formGamePlaceholderMessage ?? "")}
        className={styles.textarea}
        name="message"
        onChange={handleChange}
        value={formData.message}
      />
      <Button
        pageName="contact"
        type="submit"
      >
        <span>{ui?.formGameButtonSubmit ?? ""}</span>
      </Button>
    </form>
  );
};

export default ContactGameForm;
