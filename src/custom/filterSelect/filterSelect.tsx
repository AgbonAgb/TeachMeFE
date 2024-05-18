import { FC, SelectHTMLAttributes } from "react";
import styles from "./select.module.css";

interface ComponentProps extends SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  options?: JSX.Element[] | null;
  label?: string;
}

const Select: FC<ComponentProps> = ({
  children,
  placeholder,
  options,
  label,
  ...props
}) => {
  return (
    <div style={{ width: "100%" }}>
      {label && <label className={styles.label}>{label}</label>}
      
      <select {...props} className={styles.select}>
        <option value="" >
          {placeholder}
        </option>
        {/* {children} */}
        {options}
      </select>
    </div>
  );
};

export default Select;
