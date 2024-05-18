import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../../custom/input/input";
import CustomSelect from "../../../custom/select/select";
import Button from "../../../custom/button/button";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../../store/store";
import { useMutation } from "@tanstack/react-query";
import Layout from "../../layout/layout";
import { useState } from "react";
import { Modal } from "antd";
import { ReactComponent as Cancel } from "../../../assets/cancel.svg";
import SuccessModal from "./modalContent/successModal";
import { useAtomValue } from "jotai";
import { ChangePasswordCall } from "../../../requests";
import { App } from "antd";
import { errorMessage } from "../../utils/errorMessage";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const user = useAtomValue(userAtom);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = ()=>{
    setShowModal(true)
  }
  const params = new URLSearchParams(window.location.href.split("?").pop());
  const email =user?.UserId;

 
  const ResetPasswordMutation = useMutation({
    mutationFn:ChangePasswordCall,
    mutationKey: ["change-password"],
  });


  const ChangePasswordHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {

    const payload: ChangePasswordPayload = {
    CurrentPassword: values.OldPassword,
    NewPassword: values.NewPassword,
    ConfirmPassword: values.ConfirmPassword,
    memberId: user?.UserId!,
    };
  
    try {
      await ResetPasswordMutation.mutateAsync(payload, {
        onSuccess: () => {
          notification.success({
            message: "Success",
            // description: data.Message,
          });
          resetForm()
         
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: errorMessage(error) || "An error occurred",
      });
    }
  };


  const validationRules = Yup.object().shape({
    NewPassword: Yup.string()
      .required("Password is required")
      .max(20, "Password must have a maximum length of 20 characters")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/,
        "The password must contain a mix of uppercase letters, lowercase letters, and numbers."
      ),

    OldPassword: Yup.string()
      .required("Password is required")
      .max(20, "Password must have a maximum length of 20 characters")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/,
        "The password must contain a mix of uppercase letters, lowercase letters, and numbers."
      ),
    ConfirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("NewPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });
  const formik = useFormik<FormikValues>({
    initialValues: {
      OldPassword: "",
      NewPassword: "",
      ConfirmPassword: "",
    },
    onSubmit: (data, { resetForm }) => {
      ChangePasswordHandler(data, resetForm);
    },
    validationSchema: validationRules,
  });

  return (
    <main className={styles.main}>
      <FormikProvider value={formik}>
        <Layout heading="Change Password" />

        <form className={styles.form} onSubmit={formik.handleSubmit}>
         
          <Field
            as={Input}
            name="OldPassword"
            placeholder="Enter Old Password"
            displayInput="password"
            label="Old Password"
          />
          <Field
            as={Input}
            name="NewPassword"
            placeholder="Enter New Password"
            displayInput="password"
            label="NewPassword"
          />
            <Field
            as={Input}
            name="ConfirmPassword"
            placeholder="Enter Confirm Password"
            displayInput="password"
            label="ConfirmPassword"
          />
      

          <section className={styles.btnSection}>
            <Button className={styles.btn} text={"Reset Password"} />
          </section>
        </form>
      </FormikProvider>

      <Modal
    open={showModal}
    footer=""
    onCancel={() => setShowModal(false)}
    centered
    closeIcon={<Cancel />}
    className="modal"
    // width={'25%'}


  >
    <SuccessModal/>
  
  
  </Modal>
    </main>
  );
};

export default ChangePassword;
