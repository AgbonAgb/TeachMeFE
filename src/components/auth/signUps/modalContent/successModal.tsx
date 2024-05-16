import React from 'react'
import styles from "./styles.module.scss";
import { ReactComponent as Mail } from "../../../../assets/mail.svg";


const SuccessModal = () => {
  return (
    <main className={styles.main}>
        <section className={styles.section}>
        <Mail/>

        <h1 className={styles.email}>Email Sent</h1>
        <p>An email has been sent to femilawal@gmail.com with a confirmation link to activate your account.</p>
     
    </section>

    </main>
  )
}

export default SuccessModal