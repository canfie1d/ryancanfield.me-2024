import classNames from "classnames";
import { CSSProperties, ChangeEventHandler } from "react";
import Text from "~/components/Text";
import styles from "./Toggle.module.scss";

const Toggle = ({
  id,
  name,
  label,
  description,
  checked,
  onChange,
  style,
  danger,
}: {
  id: string;
  name: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  style?: CSSProperties;
  danger?: boolean;
}) => {
  return (
    <div
      className={classNames(styles.toggle, danger && styles.toggleDanger)}
      style={style}
    >
      <input
        className={styles.toggleInput}
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>
        <div className={styles.toggleTrack}>
          <div
            className={classNames(
              styles.toggleHandle,
              checked && styles.toggleHandleChecked
            )}
          />
        </div>
        <div>
          <span className={styles.toggleLabel}>{label}</span>
          {description && (
            <Text className={styles.toggleDescription}>{description}</Text>
          )}
        </div>
      </label>
    </div>
  );
};

export default Toggle;
