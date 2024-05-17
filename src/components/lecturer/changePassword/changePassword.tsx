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
import apiCall from "../../utils/apiCall";
import Layout from "../../layout/layout";
import { useState } from "react";
import { Modal } from "antd";
import { ReactComponent as Cancel } from "../../../assets/cancel.svg";
import SuccessModal from "./modalContent/successModal";

interface Payload {
  OldPassword: string;
  NewPassword: string;
}

const ChangePassword = () => {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const [showModal, setShowModal] = useState(true);
  const handleShowModal = ()=>{
    setShowModal(true)
  }
  const AccountDetailsApi = async (data: Payload) => {
    return (await apiCall().post("/Authentication/Authenticate", data))?.data;
  };

  const AccountDetailsMutation = useMutation({
    mutationFn: AccountDetailsApi,
    mutationKey: ["account-details"],
  });

  const AccountDetailsHandler = async (
    data: FormikValues,
    resetForm: () => void
  ) => {
    const loginUser: Payload = {
      OldPassword: data?.OldPassword?.trim(),
      NewPassword: data?.NewPassword?.trim(),
    };

    try {
      await AccountDetailsMutation.mutateAsync(loginUser, {
        onSuccess: (data) => {
          // showNotification({
          //   message: "User Log in successful",
          //   type: "success",
          // });
          handleShowModal()

        },
      });
    } catch (error: any) {
      // showNotification({
      //   message:
      //     error?.response?.data?.Message || error?.message || " Login Failed",
      //   type: "error",
      // });
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
      .oneOf([Yup.ref("OldPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });
  const formik = useFormik<FormikValues>({
    initialValues: {
      BankName: "",
      AccountNumber: "",
      AccountName: "",
      AccountType: "",
    },
    onSubmit: (data, { resetForm }) => {
      AccountDetailsHandler(data, resetForm);
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
