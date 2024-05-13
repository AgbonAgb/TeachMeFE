import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import React from "react";
import { object } from "yup";
import Input from "../../../../custom/input/input";
import Button from "../../../../custom/button/button";

const StudentSignUp = () => {
  const validationRules = object().shape({});

  const formik = useFormik<FormikValues>({
    initialValues: {},
    onSubmit: (values) => {
      // console.log(values);
    },
    validationSchema: validationRules,
  });
  return <FormikProvider value={formik}>
    <Field as={Input} name="FirstName" placeholder=" First Name" displayInput="text" label="First Name"  /> 
    <Button text={'Create Account'} />
  </FormikProvider>;
};

export default StudentSignUp;
