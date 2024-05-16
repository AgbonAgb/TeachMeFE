import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../../../custom/input/input";
import CustomSelect from "../../../../custom/select/select";
import Button from "../../../../custom/button/button";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../../utils/store";
import { useMutation, useQueries } from "@tanstack/react-query";
import apiCall from "../../../utils/apiCall";
import Layout from "../../../layout/layout";
import { useState } from "react";
import { ReactComponent as Back } from "../../../../assets/keyboard_backspace.svg";
import { AxiosError } from "axios";

interface Payload {
  BankName: string;
  AccountNumber: string;
  AccountName: string;
  AccountType: string;
}

const ContentUpload = () => {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  const getMaterialType = async () => {
    const url = "/Lecturer/MaterialType";

    return await apiCall().get(url);
  };

  const getCategory = async () => {
    const url = "/Category";

    return await apiCall().get(url);
  };
  const [getMaterialTypeQuery,getCategoryQuery ] = useQueries({
    queries: [
      {
        queryKey: ["get-all-material-type"],
        queryFn: getMaterialType,
        retry: 0,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["get-all-category"],
        queryFn: getCategory,
        retry: 0,
        refetchOnWindowFocus: false,
      },
    ],
  });


  const getMaterialError = getMaterialTypeQuery?.error as AxiosError;
  const getMaterialErrorMessage = getMaterialError?.message;

  const getCategoryError = getCategoryQuery?.error as AxiosError;
  const getCategoryErrorMessage = getCategoryError?.message;

  const getMaterialData = getMaterialTypeQuery?.data?.data?.Data;
  const getCategoryData = getCategoryQuery?.data?.data?.Data;

  const materialOptions =
  getMaterialData && getMaterialData?.length > 0 ? (
      getMaterialData?.map((item: any, index: number) => (
        <option value={item?.Id} key={index + 1}>
          {item?.Name}
        </option>
      ))
    ) : (
      <option disabled>
        {getMaterialTypeQuery?.isLoading
          ? "loading...."
          : getMaterialTypeQuery?.isError
          ? getMaterialErrorMessage
          : ""}
      </option>
    );

    const categoryOptions =
    getCategoryData && getCategoryData?.length > 0 ? (
      getCategoryData?.map((item: any, index: number) => (
        <option value={item?.CategoryId} key={index + 1}>
          {item?.ContentCategoryName}
        </option>
      ))
    ) : (
      <option disabled>
        {getCategoryQuery?.isLoading
          ? "loading...."
          : getCategoryQuery?.isError
          ? getCategoryErrorMessage
          : ""}
      </option>
    );
    console.log(getMaterialTypeQuery?.data, 'dta')

  const AccountDetailsApi = async (data: Payload) => {
    return (await apiCall().post("/Authentication/Authenticate", data))?.data;
  };

  const AccountDetailsMutation = useMutation({
    mutationFn: AccountDetailsApi,
    mutationKey: ["upload-content"],
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
        <Back onClick={()=>{navigate('/content-management')}}/>
        <Layout heading="Content Upload" />

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <Field
            as={Input}
            name="ContentName"
            placeholder="Enter Content Name"
            displayInput="text"
            label="Content Name"
          />
          
          {/* <Field
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
          /> */}
          <Field
            as={CustomSelect}
            name="Category"
            placeholder="Select Category"
            displayInput="text"
            label="Category"
          >
            {categoryOptions}
          </Field>
          <Field
            as={Input}
            name="Description"
            placeholder="Enter Description"
            displayInput="text"
            label="Description"
          />
          <Field
            as={CustomSelect}
            name="MaterialType"
            placeholder="Select Material Type"
            displayInput="text"
            label="Material Type"
          >
            {materialOptions}
          </Field>
          <Field
            as={Input}
            name="ExpirationLength"
            placeholder="Enter Expiration Length"
            displayInput="text"
            label="Expiration Length"
          />
           <Field
            as={Input}
            name="ExpirationLength"
            placeholder="Select Date"
            displayInput="date"
            label="Publish Date"
          />

          <section className={styles.btnSection}>
            <Button className={styles.btn} text={"Save"} />
          </section>
        </form>
      </FormikProvider>
    </main>
  );
};

export default ContentUpload;
