import { Spin } from "antd";
import styles from "./styles.module.scss";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: React.ReactNode;
  isLoading?: boolean;
  iconBefore?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ text, className, isLoading, iconBefore, disabled, ...rest }) => {
  return (
    <button {...rest} className={classNames(styles.button, className)} disabled={disabled}>
      {iconBefore}
      {isLoading ? <Spin className={styles.spinner} /> : text}
    </button>
  );
};

export default Button;
