import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import styles from "./styles.module.scss";
import LecturerSignUp from "./signUps/lecturerSignUp";
import StudentSignUp from "./signUps/studentSignUp";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const [value, setValue] = useState("");

  const onChange = (e: RadioChangeEvent) => {
    // console.log( e.target.value);
    setValue(e.target.value);
  };

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.welcome}>Welcome</h1>
     { value === "lecturer" ? <p>Log in to your account</p> :  <p>Create your account</p>}
      </div>

      <Radio.Group onChange={onChange} value={value} style={{ flexWrap: "nowrap", display: "flex" }}>
        <Radio value={"lecturer"} className={`${value === "lecturer" ? styles.activeRadio : ""}`}>
          Sign up as a Lecturer
        </Radio>
        <Radio value={"student"} className={`${value === "student" ? styles.activeRadio : ""}`}>
          Sign up as a Student
        </Radio>
      </Radio.Group>
      <div className={styles.form}>
        {value === "lecturer" && <LecturerSignUp />}
        {value === "student" && <StudentSignUp />}
      </div>

      <p className={styles.para}>
        Already have an account? <Link to={"/sign-in"} className={styles.link}>Sign In</Link>
      </p>
    </>
  );
};

export default SignUp;
