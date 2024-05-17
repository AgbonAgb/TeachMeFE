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

interface Payload {
  BankName: string;
  AccountNumber: string;
  AccountName: string;
  AccountType: string;
}

const AccountDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

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
      BankName: data?.BankName?.trim(),
      AccountNumber: data?.AccountNumber?.trim(),
      AccountName: data?.AccountName?.trim(),
      AccountType: data?.AccountType?.trim(),
    };

    try {
      await AccountDetailsMutation.mutateAsync(loginUser, {
        onSuccess: (data) => {
          // showNotification({
          //   message: "User Log in successful",
          //   type: "success",
          // });

        
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

  const StatusOptions = [
    {
      name: "Approved",
      value: true,
    },
    {
      name: "Rejected",
      value: false,
    },
    {
      name: "Pending",
      value: " ",
    },
  ];

  const statusData: any =
    StatusOptions &&
    StatusOptions?.length > 0 &&
    StatusOptions?.map((item: any, index: number) => (
      <option value={item?.value} key={index}>
        {item?.name}
      </option>
    ));

  const validationRules = Yup.object().shape({
    Email: Yup.string()
      .required("Email Address is required")
      .email("Invalid email Address"),
    Password: Yup.string().required("Password is required"),
    file: Yup.mixed().required("Required"),
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
        <Layout heading="Setup Account Details" />

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <Field
            as={CustomSelect}
            name="BankName"
            placeholder="Select Bank Name"
            displayInput="text"
            label="Bank Name"
          >
            {statusData}
          </Field>
          <Field
            as={Input}
            name="AccountNumber"
            placeholder="Enter 10 digit Account Number"
            displayInput="text"
            label="Bank Account Number"
          />
          <Field
            as={Input}
            name="AccountName"
            placeholder="Enter Account Name"
            displayInput="text"
            label="Account Name"
          />
          <Field
            as={CustomSelect}
            name="AccountType"
            placeholder="Select Account type"
            displayInput="text"
            label="Account Type"
          >
            {statusData}
          </Field>

          <section className={styles.btnSection}>
            <Button className={styles.btn} text={"Save"} />
          </section>
        </form>
      </FormikProvider>
    </main>
  );
};

export default AccountDetails;
