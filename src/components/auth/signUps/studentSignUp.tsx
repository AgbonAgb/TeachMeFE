import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import { object } from "yup";
import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";
import styles from "../styles.module.scss"

const StudentSignUp = () => {
  const validationRules = object().shape({});

  const formik = useFormik<FormikValues>({
    initialValues: {},
    onSubmit: (values) => {
      // console.log(values);
    },
    validationSchema: validationRules,
  });
  return (
    <FormikProvider value={formik}>
      <Field as={Input} name="FirstName" placeholder="Enter First Name" displayInput="text" label="First Name" />
      <Field as={Input} name="LastName" placeholder="Enter Last Name" displayInput="text" label="Last Name" />
      <Field as={Input} name="EmailAddress" placeholder="Enter Email Address" displayInput="text" type="email" label="Email Address" />
      <Field as={Input} name="PhoneNumber" placeholder="Enter Phone Number" displayInput="text" label="Phone Number" />
      <Field as={Input} name="Password" placeholder="Enter Password" displayInput="password" label="Password" />
      <Field as={Input} name="ConfirmPassword" placeholder="Enter Confirm Password" displayInput="password" label="Password" />
      <Button text={"Create Account"} className={styles.button}/>
    </FormikProvider>
  );
};

export default StudentSignUp;
