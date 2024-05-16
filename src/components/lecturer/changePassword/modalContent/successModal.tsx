import React from 'react'
import styles from "./styles.module.scss";
import { ReactComponent as Mail } from "../../../../assets/success.svg";


const SuccessModal = () => {
  return (
    <main className={styles.main}>
        <section className={styles.section}>
        <Mail/>

        <h1 className={styles.email}>Password Updated!</h1>
<p>Password updated successfully.</p>     
    </section>

    </main>
  )
}

export default SuccessModal