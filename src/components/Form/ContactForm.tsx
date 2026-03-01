import classNames from "classnames";
import { useEffect, useState } from "react";
import { useAchievementStore } from "~/stores/achievements";
import { useInventoryStore } from "~/stores/inventory";
import { INVENTORY_ITEMS } from "~/data/inventory";
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
  const setToast = useAchievementStore((store) => store.setToast);
  const addItem = useInventoryStore((store) => store.addItem);
  const hasItem = useInventoryStore((store) => store.hasItem);
  const { data: ui } = useUiStrings();

  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formSuccess =
    typeof window !== "undefined" && window.location.search.includes("success=true");
  const showSuccess = formSuccess || submitted;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const encoded = new URLSearchParams({
      "form-name": "contact",
      name: formData.name,
      email: formData.email,
      message: formData.message,
    }).toString();

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encoded,
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      if (!hasAchievement("first_contact")) addAchievement("first_contact");
      if (!hasItem("jewel-contact")) {
        addItem("jewel-contact");
        const jewel = INVENTORY_ITEMS["jewel-contact"];
        setToast({
          open: true,
          title: jewel.name,
          message: jewel.description,
        });
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (formSuccess) {
      if (!hasAchievement("first_contact")) {
        addAchievement("first_contact");
      }
      if (!hasItem("jewel-contact")) {
        addItem("jewel-contact");
        const jewel = INVENTORY_ITEMS["jewel-contact"];
        setToast({
          open: true,
          title: jewel.name,
          message: jewel.description,
        });
      }
    }
  }, [formSuccess, addAchievement, addItem, hasAchievement, hasItem, setToast]);

  if (showSuccess) {
    return <Text className={classNames(styles.submitMessage)}>{ui?.formSuccessMessage ?? ""}</Text>;
  }

  return (
    <form
      className={styles.form}
      name="contact"
      method="post"
      action="/contact?success=true"
      onSubmit={handleSubmit}
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
      {submitError && (
        <p
          className={styles.error}
          role="alert"
        >
          {submitError}
        </p>
      )}
      <Button
        pageName="contact"
        type="submit"
        disabled={isSubmitting}
      >
        <span>{isSubmitting ? "Sending…" : (ui?.formButtonSend ?? "")}</span>
      </Button>
    </form>
  );
};

export default ContactForm;
