
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import Button from "../../custom/button/button";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1 className={styles.notFound}>404</h1>
      <p>The page you're looking for does not exist.</p>
      <br />
      <Button onClick={() => navigate("/home")} text="Back to Home" />
    </div>
  );
};

export default ErrorPage;
