import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../../../custom/input/input";
import CustomSelect from "../../../../custom/select/select";
import Button from "../../../../custom/button/button";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { userAtom } from "../../../../store/store";
import Layout from "../../../layout/layout";
import { useState } from "react";
import { AxiosError } from "axios";
import { errorMessage } from "../../../utils/errorMessage";
import { App } from "antd";
import { useAtomValue } from "jotai";
import request from "../../../../requests/request";


interface Props{
  CategoryData?:CategoryPayload
  handleCloseEditModal:()=>void
}

const EditCategory = ({CategoryData, handleCloseEditModal}:Props) => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const queryClient = useQueryClient();

   const EditCategoryCall = async (payload: CategoryPayload) => {

    const url =`Category/${CategoryData?.CategoryId}`;
    return await request.put(url,payload);
  };

  const UploadContentMutation = useMutation({
    mutationFn: EditCategoryCall,
    mutationKey: ["edit-category"],
  });

  const UploadContentHandler = async (
    data: FormikValues,
  ) => {
    const uploadContent: CategoryPayload = {
        ContentCategoryName: data?.ContentCategoryName,
        LecturerId: user?.UserId!,
    
    };

    try {
      await UploadContentMutation.mutateAsync(uploadContent, {
        onSuccess: () => {
          notification.success({
            message: "Success",
            description: data.Message,
          });
          queryClient.refetchQueries({ queryKey: ["get-all-category-lecturer-id"] });
          handleCloseEditModal()
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
   
    ContentCategoryName: Yup.string().required("Category Name is required"),


  });

  const formik = useFormik<FormikValues>({
    initialValues: {
        LecturerId: user?.UserId || '',
      ContentCategoryName: CategoryData?.ContentCategoryName  || "",
    
    },
    onSubmit: (data, { resetForm }) => {
      UploadContentHandler(data);
    },
    validationSchema: validationRules,
  });
  console.log(CategoryData, 'djdjj')

  return (
    <main className={styles.main}>
      <FormikProvider value={formik}>
        
        <Layout heading="Update Category" />

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <Field
            as={Input}
            name="ContentCategoryName"
            placeholder="Enter Category Name"
            displayInput="text"
            label="Content Category Name"
          />

          <section className={styles.btnSection}>
            <Button disabled={UploadContentMutation?.isPending} className={styles.btn} text={UploadContentMutation?.isPending ?  'Saving...' : "Save"} />
          </section>
        </form>
      </FormikProvider>
    </main>
  );
};

export default EditCategory;
