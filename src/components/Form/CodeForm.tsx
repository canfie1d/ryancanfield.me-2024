import { useRef } from "react";
import { useAchievementContext } from "../../contexts/AchievementProvider";
import Button from "../Button";
import styles from "./Form.module.scss";

type InputType = React.MutableRefObject<HTMLInputElement>;

const CodeForm = ({
  setLoreButtonActive,
}: {
  setLoreButtonActive: (arg: boolean) => void;
}) => {
  const { hasAchievement, addAchievement } = useAchievementContext();

  const inputs: InputType[] = [
    useRef<HTMLInputElement>(null!),
    useRef<HTMLInputElement>(null!),
    useRef<HTMLInputElement>(null!),
    useRef<HTMLInputElement>(null!),
  ];

  const handleOnChange = () => {
    const digit1 = inputs[0].current.value;
    const digit2 = inputs[1].current.value;
    const digit3 = inputs[2].current.value;
    const digit4 = inputs[3].current.value;

    const formatCode = (
      digit1: string,
      digit2: string,
      digit3: string,
      digit4: string
    ) => {
      return parseInt(digit1 + digit2 + digit3 + digit4);
    };
    const code = formatCode(digit1, digit2, digit3, digit4);

    if (code.toString() === import.meta.env.VITE_LORE_PASSWORD) {
      if (!hasAchievement("reward_determination")) {
        addAchievement("reward_determination");
      }

      setLoreButtonActive(true);
    }
  };

  const resetForm = () => {
    inputs[0].current.value = "";
    inputs[1].current.value = "";
    inputs[2].current.value = "";
    inputs[3].current.value = "";
  };

  const renderInputs = () => {
    return inputs.map((input, index) => (
      <input
        key={`code-input-${index}`}
        type="text"
        maxLength={1}
        ref={input}
        aria-label={`Code Digit ${index + 1}`}
        onChange={handleOnChange}
        onKeyDown={(e) => {
          if (
            (!e.key.match("^[0-9]*$") && e.key !== "Tab") ||
            e.key === "Backspace"
          ) {
            e.preventDefault();
          }
        }}
      />
    ));
  };

  return (
    <>
      <form className={styles.codeForm}>{renderInputs()}</form>
      <Button type="reset" onClick={resetForm}>
        <span>Clear</span>
      </Button>
    </>
  );
};

export default CodeForm;
