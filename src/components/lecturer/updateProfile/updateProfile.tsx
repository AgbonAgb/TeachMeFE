import { ErrorMessage, Field, FormikProvider, FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../../custom/checkbox/checkbox";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiCall from "../../utils/apiCallFormData";
import Layout from "../../layout/layout";
import Upload from "../../../custom/upload/upload";
import { useState } from "react";
import { ReactComponent as FileUploaded } from "../../../assets/uploadedFile.svg";
import { ReactComponent as Close } from "../../../assets/close (1).svg";
import { AxiosError } from "axios";

interface Payload {
  LecturerProfileId?:string;
  LecturerId?:string;
  LinkName: string;
  NickName?: string;
  Address: string;
  PixFile: File | null;
  IdCardFile: File | null;
  TermsCondition:boolean;
}

const LecturerProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const [idCard, setIdCard] = useState<File | null>(null);

  const handlePassportPhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files;
    if (file) {
      setPassportPhoto(file[0]);
      formik.setFieldValue("passportPhoto", file[0]);
    }
  };

  const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setIdCard(file[0]);
      formik.setFieldValue("idCard", file[0]);
    }
  };
  const cancelPhoto=() =>{
    setPassportPhoto(null);
  }
  const cancelIdCard=() =>{
    setIdCard(null);
  }


  const getLecturer = async () => {
    const url = `/Lecturer/GetLecturer?Id=${user?.UserId}`;

    return await apiCall().get(url);
  };

  const {
    data,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["get-lecturer"],
    queryFn: getLecturer,
    refetchOnWindowFocus: false,
    retry: 0,
    enabled: true,
  });

  const LecturerData = data?.data?.Data;
  const LecturerDataError = error as AxiosError;
  const LecturerDataErrorMessage = LecturerDataError?.message;

  const LecturerProfile = async (data: Payload) => {
    return (await apiCall().post("/Lecturer/UpdateProfile", data))?.data;
  };

  const UpdateProfileMutation = useMutation({
    mutationFn: LecturerProfile,
    mutationKey: ["Lecturer-Profile"],
  });

  const UpdateProfileHandler = async (data: FormikValues, resetForm: () => void) => {
    const profile: Payload = {
      LecturerId:user?.UserId,
      LinkName: data?.LinkName?.trim(),
      // NickName: data?.NickName?.trim(),
      Address: data?.HouseAddress?.trim(),
      PixFile:passportPhoto,
      IdCardFile:idCard ,
      TermsCondition:data?.isChecked,

    };
 

    try {
      await UpdateProfileMutation.mutateAsync(profile, {
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

  console.log(passportPhoto?.size, "passss");

  const validationRules = Yup.object().shape({
    LinkName: Yup.string().required("Link Name is required"),
    HouseAddress: Yup.string().required("Address is required"),
    passportPhoto: Yup.mixed().required("Passport Photo is Required"),
    idCard: Yup.mixed().required("Id Card is Required"),
    isChecked: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions'),

  });

  const formik = useFormik<FormikValues>({
    initialValues: {
      LinkName: "",
      // NickName: "",
      HouseAddress: "",
      passportPhoto: "",
      idCard: "",
      isChecked:false
    },
    onSubmit: (data, { resetForm }) => {
      UpdateProfileHandler(data, resetForm);
    },
    validationSchema: validationRules,
  });
  console.log(formik.errors.isChecked)
  return (
    <main>

    <FormikProvider value={formik}>
        <Layout heading="Update Profile" />

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <Field
            as={Input}
            name="LinkName"
            placeholder="Enter Link Name"
            displayInput="text"
            label="Link Name"
          />
          {/* <Field
            as={Input}
            name="Nickname"
            placeholder=" Enter Nickname"
            displayInput="text"
            label="Nickname"
          /> */}
          <Field
            as={Input}
            name="HouseAddress"
            placeholder=" Enter House Address"
            displayInput="text"
            label="House Address"
          />
          {passportPhoto?.name === null || passportPhoto?.name === undefined ? (
            <>
              <Upload
                // label="Upload Passport Picture"
                description={<p>Upload Passport Picture</p>}
                accept="pdf"
                //  .jpeg, .png,.pdf,
                // .JPEG,.PDF,.PNG,.doc,.docx,.DOC,.DOCX"
                // accept="img,pdf"
                allowedFormats={["pdf", "img"]}

                // allowedFormats={[".docx)"]}
                // allowedFormats={["max:10mb (docx, pdf)"]}

                onChange={handlePassportPhotoChange}
                fileName={passportPhoto?.name}
              />
              {formik.touched.passportPhoto && formik.errors.passportPhoto ? (
                <div
                className='error'
                >{`${formik.errors.passportPhoto.toString()}`}</div>
              ) : null}
            </>
          ) : (
            <div className={styles.uploaded}>
              <FileUploaded />
              <span>{passportPhoto?.name}</span>
              {passportPhoto && (
                <span>{(passportPhoto?.size / 1024).toFixed(2)}MB</span>
              )}
              <Close className={styles.pointer} onClick={cancelPhoto}/>
            </div>
          )}

          {idCard?.name === null || idCard?.name === undefined ? (
            <>
              <Upload
                // label="Valid ID Card"
                description={<p>Valid ID Card</p>}
                accept="pdf"
                //  .jpeg, .png,.pdf,
                // .JPEG,.PDF,.PNG,.doc,.docx,.DOC,.DOCX"
                // accept="img,pdf"
                allowedFormats={["max:10mb (docx, pdf)"]}
                onChange={handleIdCardChange}
                fileName={idCard?.name}
              />
              {formik.touched.idCard && formik.errors.idCard ? (
                <div
                className='error'
                >{`${formik.errors.idCard.toString()}`}</div>
              ) : null}
            </>
          ) : (
            <div className={styles.uploaded}>
              <FileUploaded />
              <span>{idCard?.name}</span>
              {idCard && <span>{(idCard?.size / 1024).toFixed(2)}MB</span>}
              <Close className={styles.pointer}  onClick={cancelIdCard}/>
            </div>
          )}

          <div className={styles.group}>
            <p className={styles.terms}>Terms & Conditions</p>
            <p>
              Ensure that only educational content (Audio or PDF) will be
              uploaded by me.
            </p>

            <span style={{ display: "flex" }}>
              <Field name="isChecked" as={Checkbox} />

              <label>
                I agree to the above{" "}
                <span style={{ color: "red" }}>Terms and Conditions</span>
              </label>

            </span>
            <ErrorMessage  className='error' name="isChecked" component="div" />

          </div>

          <section className={styles.btnSection}>
            <Button className={styles.btn} text={UpdateProfileMutation?.isPending ? 'Uploading...' : "Update"} />
          </section>
        </form>
    </FormikProvider>
    </main>

  );
};

export default LecturerProfile;
