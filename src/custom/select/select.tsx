import { useField, FieldHookConfig } from "formik";
import styles from "./styles.module.scss"
import { Spin } from "antd";

interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
  
}

const CustomSelect: React.FC<SelectProps & FieldHookConfig<string> & any> = (props) => {
  const { label, placeholder, children, onChange, disabled, isLoading, isError, error, ...rest } = props;
  const [field, meta] = useField(rest);

  return (
    <section className={styles.container}>
      <label className={styles.label}> {isLoading ? <Spin/> : isError ? error : label}</label>

      <select {...field} className={styles.select} value={field.value} {...rest}   onChange={(e) => {
              field.onChange(e);
              onChange?.(e);
            }}>
        <option value="" defaultValue={""}>
          {placeholder}
        </option>
        {children}
      </select>

      {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
    </section>
  );
};

export default CustomSelect;
