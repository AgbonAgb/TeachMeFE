import { Outlet } from "react-router-dom"
import styles from "./styles.module.scss"

const AuthLayout = () => {
  return (
    <section className={styles.main}>
      <h1 className={styles.name}>Teach Me</h1>
      <div className={styles.children}>
        <div className={styles.card}>
<Outlet />
        </div>

      </div>

    </section>
  )
}

export default AuthLayout