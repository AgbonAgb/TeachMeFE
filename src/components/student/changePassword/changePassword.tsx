import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import styles from "./styles.module.scss";
import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";

const ChangePassword = () => {
  const formik = useFormik<FormikValues>({
    initialValues: {},
    onSubmit: (value: any) => {},
  });
  return (
    <section>
      <h1 className={styles.heading}>Change Password</h1>
      <div className={styles.form}>
        <FormikProvider value={formik}>
            <Field as={Input} displayInput="password" label="Old Password" placeholder="Enter Old Password" name="password"/>
            <Field as={Input} displayInput="password" label="New Password" placeholder="Enter New Password" name="password"/>
            <Field as={Input} displayInput="password" label="Confirm Password" placeholder=" Confirm new Password" name="password"/>

            <div>
                <Button text="Change Password"/>
            </div>
        </FormikProvider>
      </div>
    </section>
  );
};

export default ChangePassword;
