import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../../custom/checkbox/checkbox";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/store";
import { useMutation } from "@tanstack/react-query";
import apiCall from "../../utils/apiCall";
import Layout from "../../layout/layout";
import Upload from "../../../custom/upload/upload";
import { useState } from "react";
import { ReactComponent as FileUploaded } from "../../../assets/uploadedFile.svg";
import { ReactComponent as Close } from "../../../assets/close (1).svg";

interface Payload {
  LinkName: string;
  NickName: string;
  HouseAddress: string;
  passportPhoto: File | null;
  idCard: File | null;
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
      formik.setFieldValue("file", file[0]);
    }
  };

  const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setIdCard(file[0]);
      formik.setFieldValue("file", file[0]);
    }
  };

  const LecturerProfile = async (data: Payload) => {
    return (await apiCall().post("/Authentication/Authenticate", data))?.data;
  };

  const UpdateProfileMutation = useMutation({
    mutationFn: LecturerProfile,
    mutationKey: ["Lecturer-Profile"],
  });

  const UpdateProfileHandler = async (data: FormikValues, resetForm: () => void) => {
    const loginUser: Payload = {
      LinkName: data?.LinkName?.trim(),
      NickName: data?.NickName?.trim(),
      HouseAddress: data?.HouseAddress?.trim(),
      passportPhoto:passportPhoto,
      idCard:idCard ,

    };
 

    try {
      await UpdateProfileMutation.mutateAsync(loginUser, {
        onSuccess: (data) => {
          // showNotification({
          //   message: "User Log in successful",
          //   type: "success",
          // });

          setUser({
            AdminUserHasChangePassword: data?.AdminUserHasChangePassword,
            FirstName: data?.FirstName,
            Id: data?.Id,
            Message: data?.Message,
            RoleIds: data?.RoleIds,
            StatusCode: data?.StatusCode,
            Token: data?.Token,
            UserName: data?.UserName,
            expiryDate: data?.expiryDate,
            RoleNames: data?.RoleNames,
          });
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
    Email: Yup.string()
      .required("Email Address is required")
      .email("Invalid email Address"),
    Password: Yup.string().required("Password is required"),
    file: Yup.mixed().required("Required"),
  });

  const formik = useFormik<FormikValues>({
    initialValues: {
      LinkName: "",
      NickName: "",
      HouseAddress: "",
      passportPhoto: "",
      idCard: "",
    },
    onSubmit: (data, { resetForm }) => {
      UpdateProfileHandler(data, resetForm);
    },
    validationSchema: validationRules,
  });
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
          <Field
            as={Input}
            name="Nickname"
            placeholder=" Enter Nickname"
            displayInput="text"
            label="Nickname"
          />
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
                allowedFormats={["max:10mb (png, jpg, docx, pdf)"]}
                onChange={handlePassportPhotoChange}
                fileName={passportPhoto?.name}
              />
              {formik.touched.passportPhoto && formik.errors.passportPhoto ? (
                <div
                  className={styles.error}
                >{`*${formik.errors.passportPhoto.toString()}`}</div>
              ) : null}
            </>
          ) : (
            <div className={styles.uploaded}>
              <FileUploaded />
              <span>{passportPhoto?.name}</span>
              {passportPhoto && (
                <span>{(passportPhoto?.size / 1024).toFixed(2)}MB</span>
              )}
              <Close className={styles.pointer} />
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
                allowedFormats={["max:10mb (png, jpg, docx, pdf)"]}
                onChange={handleIdCardChange}
                fileName={idCard?.name}
              />
              {formik.touched.idCard && formik.errors.idCard ? (
                <div
                  className={styles.error}
                >{`*${formik.errors.idCard.toString()}`}</div>
              ) : null}
            </>
          ) : (
            <div className={styles.uploaded}>
              <FileUploaded />
              <span>{idCard?.name}</span>
              {idCard && <span>{(idCard?.size / 1024).toFixed(2)}MB</span>}
              <Close className={styles.pointer} />
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
          </div>

          <section className={styles.btnSection}>
            <Button className={styles.btn} text={"Update"} />
          </section>
        </form>
    </FormikProvider>
    </main>

  );
};

export default LecturerProfile;