import { InputHTMLAttributes, ReactNode, useState } from "react";
import styles from "./input.module.scss";
import { FieldHookConfig, useField } from "formik";
import classNames from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  placeholder?: string;
  displayInput?: string;
  className?: string;
  labelClassName?: string;
  type?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

const Input = (props: InputProps & FieldHookConfig<string> & any) => {
  const { name, icon, placeholder, label, type, displayInput, className, labelClassName, disabled, ...rest } = props;
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const inputTypes = ["text", "password", "textArea"];

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <label className={classNames(styles.label, labelClassName)}>{label}</label>

      {displayInput === inputTypes[0] && <input {...field} className={classNames(styles.input, className)} placeholder={placeholder} type={type} disabled={disabled} />}

      {displayInput === inputTypes[1] && (
        <div className={styles.password}>
          <input
            {...field}
            className={classNames(styles.input, className)}
            placeholder={placeholder}
            type={showPassword ? "text" : "password"}
            style={{ width: "100%" }}
            {...rest}
            disabled={disabled}
          />

          <button className={styles.iconButton} onClick={handleShowPassword} type="button">
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      )}

      {displayInput === inputTypes[2] && <textarea className={styles.input} {...field} placeholder={placeholder} rows={3} style={{ display: "block", width: "100%" }} />}

      {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
    </div>
  );
};
export default Input;
