import styles from "./styles.module.scss";
interface Props {
  children?: React.ReactNode;
  heading?: string;
  paragraph?: string;
  className?: string;
}

const Main: React.FC<Props> = ({ children, heading, paragraph, className }) => {
  return (
    <section className={className}>

      <span className={styles.heading}>{heading}</span>
      <p className={styles.para}>{paragraph}</p>
      {children}
    </section>
  );
};

export default Main;
