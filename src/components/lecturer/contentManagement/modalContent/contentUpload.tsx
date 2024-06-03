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
import { ReactComponent as Back } from "../../../../assets/keyboard_backspace.svg";
import { AxiosError } from "axios";
import { ReactComponent as FileUploaded } from "../../../../assets/uploadedFile.svg";
import { ReactComponent as Close } from "../../../../assets/close (1).svg";
import Upload from "../../../../custom/upload/upload";
import { GetCategoryByLecturerId, GetCategoryCall, GetMaterialTypeCall, UploadContentCall } from "../../../../requests";
import { errorMessage } from "../../../utils/errorMessage";
import { App } from "antd";
import { useAtomValue } from "jotai";


interface Props{
  data?:ContentUploadPayload
}

const ContentUpload = ({data}:Props) => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const [materials, setMaterials] = useState<File | null>(null);
  const queryClient = useQueryClient();

  console.log(data, 'modal data')
  const handleMaterialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setMaterials(file[0]);
      formik.setFieldValue("materials", file[0]);
    }
  };
  const cancelIdMaterial = () => {
    setMaterials(null);
  };

 

 
  const [getMaterialTypeQuery, getCategoryQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-material-type"],
        queryFn: GetMaterialTypeCall,
        retry: 0,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["get-all-category"],
        queryFn:()=> GetCategoryByLecturerId(user?.UserId!),
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


  const UploadContentMutation = useMutation({
    mutationFn: UploadContentCall,
    mutationKey: ["upload-content"],
  });

  const UploadContentHandler = async (
    data: FormikValues,
  ) => {
    // const uploadContent: ContentUploadPayload = {
    //   Title: data?.Title,
    //   Description: data?.Description,
    //   LecturerId: user?.UserId,
    //   Amount: data?.Amount,
    //   CategoryId: data?.CategoryId,
    //   MaterialTypeId: data?.MaterialTypeId,
    //   ExpirationDays: data?.ExpirationDays,
    //   ContentId:data?.ContentId,
    //   // PublishedDate: data?.PublishDate?.trim(),
    //   ContentUrl: data?.ContentUrl,
    //   ContentFile: materials ,
    //   LinkName: data?.LinkName,
    // };

    const payload = new FormData();
    payload.append("Title",data.Title);
    payload.append("Description",data.Description);
    payload.append("LecturerId",`${user?.UserId}`);
    payload.append("Amount", data.Amount);
    payload.append("CategoryId", data.CategoryId);
    payload.append("MaterialTypeId", data.MaterialTypeId);
    payload.append("ExpirationDays", data.ExpirationDays);


    if (materials) {
      payload.append("ContentFile", materials);
    }
    // payload.append("LinkName", data.LinkName);

    try {
      await UploadContentMutation.mutateAsync(payload, {
        onSuccess: () => {
          notification.success({
            message: "Success",
            description: data.Message,
          });
          queryClient.refetchQueries({ queryKey: ["get-all-contents"] });
          navigate('/content-management')

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
   
    Title: Yup.string().required("Title is required"),
    Description: Yup.string().required("Description is Required"),
    Amount: Yup.string().required("Amount is Required"),
    CategoryId: Yup.string().required("Category is Required"),
    MaterialTypeId: Yup.string().required("Material Type is Required"),
    ExpirationDays: Yup.number().typeError("Only numbers are allowed").required("ExpirationDays is Required"),
    materials: Yup.string().required("materials is Required"),
    // LinkName: Yup.string().required("LinkName is Required"),

  });

  const formik = useFormik<FormikValues>({
    initialValues: {
      ContentId:data?.ContentId || '',
      Title: data?.Title  || "",
      Description: data?.Description || "",
      LecturerId:  data?.LecturerId ||"",
      Amount: data?.Amount || "",
      CategoryId:data?.CategoryId || "",
      MaterialTypeId: data?.MaterialTypeId || "",
      ExpirationDays: data?.ExpirationDays || "",
      // PublishedDate:data?. "",
      materials: "",
      // LinkName: data?.LinkName || "",
    },
    onSubmit: (data, { resetForm }) => {
      UploadContentHandler(data);
    },
    validationSchema: validationRules,
  });

  return (
    <main className={styles.main}>
      <FormikProvider value={formik}>
        <Back
          onClick={() => {
            navigate("/content-management");
          }}
        />
        <Layout heading="Content Upload" />

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <Field
            as={Input}
            name="Title"
            placeholder="Enter Content Name"
            displayInput="text"
            label="Content Name"
          />

          <Field
            as={CustomSelect}
            name="CategoryId"
            placeholder="Select Category"
            displayInput="text"
            label="Category"
          >
            {categoryOptions}
          </Field>

          <Field
            as={Input}
            name="Amount"
            placeholder="Enter Amount"
            displayInput="text"
            label="Amount"
          />
       

          <Field
            as={Input}
            name="Description"
            placeholder="Enter Description"
            displayInput="textArea"
            label="Description"
          />
          <Field
            as={CustomSelect}
            name="MaterialTypeId"
            placeholder="Select Material Type"
            displayInput="text"
            label="Material Type"
          >
            {materialOptions}
          </Field>
          <Field
            as={Input}
            name="ExpirationDays"
            placeholder="Enter Expiration Date Length E.g(40)"
            displayInput="text"
            label="Expiration Date Length"
          />
          {/* <Field
            as={Input}
            name="PublishedDate"
            placeholder="Select Date"
            displayInput="date"
            label="Publish Date"
          /> */}
          {materials?.name === null || materials?.name === undefined ? (
            <>
              <Upload
                // label="Valid ID Card"
                description={<p>Upload Content</p>}
                accept="pdf,mp3,wav,ogg"
               
                allowedFormats={[" (pdf, mp3, wav, ogg)"]}
                onChange={handleMaterialsChange}
                fileName={materials?.name}
              />
              {formik.touched.materials && formik.errors.materials ? (
                <div className="error">{`${formik.errors.materials.toString()}`}</div>
              ) : null}
            </>
          ) : (
            <div className={styles.uploaded}>
              <FileUploaded />
              <span>{materials?.name}</span>
              {materials && (
                <span>{(materials?.size / 1024).toFixed(2)}MB</span>
              )}
              <Close className={styles.pointer} onClick={cancelIdMaterial} />
            </div>
          )}

          <section className={styles.btnSection}>
            <Button disabled={UploadContentMutation?.isPending} className={styles.btn} text={UploadContentMutation?.isPending ?  'Saving...' : "Save"} />
          </section>
        </form>
      </FormikProvider>
    </main>
  );
};

export default ContentUpload;
