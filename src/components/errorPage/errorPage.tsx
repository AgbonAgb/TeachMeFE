
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import Button from "../../custom/button/button";
import { userAtom } from "../../store/store";
import { useAtom } from "jotai";

const ErrorPage = () => {
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);

  const redirect = ()=>{
    if (user?.UserType?.toLowerCase() === "student"){
      navigate('/overview')
    } else if(user?.UserType?.toLowerCase() === "lecturer")
    {
      navigate('/lecturer-overview')

    }
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.notFound}>404</h1>
      <p>The page you're looking for does not exist.</p>
      <br />
      <Button onClick={redirect} text="Back to Overview" />
    </div>
  );
};

export default ErrorPage;
