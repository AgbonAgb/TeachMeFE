import { FieldHookConfig, useField } from "formik";
import styles from "./checkbox.module.scss";

interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<CheckboxProps & FieldHookConfig<string> & any> = ({
  label,
  ...rest
}) => {
  const [field] = useField(rest);

  return (
    <div className={styles.checkAndLabel}>
      <input className={styles.check} {...field} type="checkbox" />
      <label htmlFor={rest.id || rest.name}>{label}</label>
    </div>
  );
};

export default Checkbox;
