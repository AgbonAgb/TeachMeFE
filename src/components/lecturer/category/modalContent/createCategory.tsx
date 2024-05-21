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
import { ReactComponent as FileUploaded } from "../../../../assets/uploadedFile.svg";
import { ReactComponent as Close } from "../../../../assets/close (1).svg";
import Upload from "../../../../custom/upload/upload";
import { CreateCategoryCall } from "../../../../requests";
import { errorMessage } from "../../../utils/errorMessage";
import { App } from "antd";
import { useAtomValue } from "jotai";


interface Props{
  handleCloseModal:()=>void

}

const CreateCategory = ({ handleCloseModal}:Props) => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const [materials, setMaterials] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const handleMaterialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setMaterials(file[0]);
      formik.setFieldValue("materials", file[0]);
    }
  };

  const UploadContentMutation = useMutation({
    mutationFn: CreateCategoryCall,
    mutationKey: ["create-category"],
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
          handleCloseModal()
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
      ContentCategoryName:  "",
    
    },
    onSubmit: (data, { resetForm }) => {
      UploadContentHandler(data);
    },
    validationSchema: validationRules,
  });

  return (
    <main className={styles.main}>
      <FormikProvider value={formik}>
      
        <Layout heading="Create Category" />

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

export default CreateCategory;
