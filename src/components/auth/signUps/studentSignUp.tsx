import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import { Schema, object, ref, string } from "yup";
import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";
import styles from "../styles.module.scss";
import { useMutation } from "@tanstack/react-query";
import { RegisterStudentCall } from "../../../requests";
import { App, Modal } from "antd";
import { errorMessage } from "../../utils/errorMessage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SuccessModal from "./modalContent/successModal";
import { ReactComponent as Cancel } from "../../../assets/cancel.svg";

const StudentSignUp = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/sign-in");
  };

  const validationRules: Schema<RegisterStudentPayload & any> = object().shape({
    // UserName: string().required("Username is required"),
    Email: string().required("Email Address is required"),
    Phone: string().required("Phone Number is required"),
    FirstName: string().required("First Name is required"),
    LastName: string().required("Last Name is required"),
    Password: string()
      .required("Password is required")
      .min(9)
      .matches(
        /(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .matches(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .matches(/(?=.*\d)/, "Password must contain at least one number"),
    ConfirmPassword: string()
      .required("required")
      .oneOf([ref("Password"), ""], "Password and Confirm Password must match"),
  });

  const registerStudentMutation = useMutation({
    mutationFn: RegisterStudentCall,
    mutationKey: ["register-student"],
  });

  const registerStudentHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: RegisterStudentPayload = {
      UserName: values.FirstName + values.LastName,
      FirstName: values.FirstName,
      LastName: values.LastName,
      Email: values.Email,
      Phone: values.Phone,
      Password: values.Password,
    };
    try {
      const data = await registerStudentMutation.mutateAsync(payload);
      notification.success({
        message: "Success",
        description: data.Message || "Sign up successful",
      });
      resetForm();
      handleShowModal();
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: errorMessage(error) || "An error occurred",
      });
    }
  };
  const formik = useFormik<FormikValues>({
    initialValues: {
      FirstName: "",
      LastName: "",
      // UserName: "",
      Email: "",
      Phone: "",
      Password: "",
      ConfirmPassword: "",
    },
    onSubmit: (values, { resetForm }) => {
      registerStudentHandler(values, resetForm);
    },
    validationSchema: validationRules,
  });
  return (
    <main>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Field
            as={Input}
            name="FirstName"
            placeholder="Enter First Name"
            displayInput="text"
            label="First Name"
          />
          <Field
            as={Input}
            name="LastName"
            placeholder="Enter Last Name"
            displayInput="text"
            label="Last Name"
          />
          {/* <Field as={Input} name="UserName" placeholder="Enter Username" displayInput="text" label="Username" /> */}
          <Field
            as={Input}
            name="Email"
            placeholder="Enter Email Address"
            displayInput="text"
            type="email"
            label="Email Address"
          />
          <Field
            as={Input}
            name="Phone"
            placeholder="Enter Phone Number"
            displayInput="text"
            label="Phone Number"
          />
          <Field
            as={Input}
            name="Password"
            placeholder="Enter Password"
            displayInput="password"
            label="Password"
          />
          <Field
            as={Input}
            name="ConfirmPassword"
            placeholder="Enter Confirm Password"
            displayInput="password"
            label="Confirm Password"
          />
          <Button
            text={"Create Account"}
            className={styles.button}
            disabled={registerStudentMutation.isPending}
            isLoading={registerStudentMutation.isPending}
          />
        </form>
      </FormikProvider>
      <Modal
        open={showModal}
        footer=""
        onCancel={handleCloseModal}
        centered
        closeIcon={<Cancel />}
        className="modal"
        // width={'25%'}
      >
        <SuccessModal userEmail={formik?.values?.Email} />
      </Modal>
    </main>
  );
};

export default StudentSignUp;
