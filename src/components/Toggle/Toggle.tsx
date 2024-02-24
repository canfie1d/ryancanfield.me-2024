import classNames from "classnames";
import { CSSProperties, ChangeEventHandler } from "react";
import styles from "./toggle.module.scss";

const Toggle = ({
  id,
  name,
  label,
  description,
  checked,
  onChange,
  style,
}: {
  id: string;
  name: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  style?: CSSProperties;
}) => {
  return (
    <div className={styles.toggle} style={style}>
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
            <p className={styles.toggleDescription}>{description}</p>
          )}
        </div>
      </label>
    </div>
  );
};

export default Toggle;
