import styles from "./styles.module.scss";
import { Circles, Style } from "react-loader-spinner";
import classNames from "classnames";

interface Props {
  className?: string;
  width?: string | number;
  height?: string | number;
  color?: string;
  style?: Style;
}

const Spinner = ({ className, width, height, color, style }: Props) => {
  return (
    <div className={styles.spinnerDiv}>
         <Circles
      wrapperClass={classNames(styles.spinner, className)}
      width={width}
      height={height}
      color= {'#094646'}
      wrapperStyle={style}
    />
    </div>
    
   
  );
};

export default Spinner;
