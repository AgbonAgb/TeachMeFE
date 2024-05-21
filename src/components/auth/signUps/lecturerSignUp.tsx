import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Modal } from "antd";
import { ReactComponent as Cancel } from "../../../assets/cancel.svg";
import { useState } from "react";
import SuccessModal from "./modalContent/successModal";
import { LecturerSignUpCall } from "../../../requests";
import { App } from "antd";
import { errorMessage } from "../../utils/errorMessage";


const LecturerSignUp = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = ()=>{
    setShowModal(true)
  }

  // const lecturerSignUpApi = async (data: Payload) => {
  //   return (await apiCall().post("/Authentication/RegisterLecturer", data))
  //     ?.data;
  // };

  const lecturerSignUpMutation = useMutation({
    mutationFn: LecturerSignUpCall,
    mutationKey: ["create-lecturer"],
  });

  const lecturerSignUpHandler = async (
    data: FormikValues,
    resetForm: () => void
  ) => {
    const lecturerSignUp: LecturerSignUpPayload = {
      FirstName: data?.FirstName?.trim(),
      LastName: data?.LastName?.trim(),
      Email: data?.Email?.trim(),
      Phone: data?.PhoneNumber?.trim(),
      Password: data?.Password?.trim(),
      UserName:'UserName',
    };
    // if (isChecked) {
    //   localStorage.setItem("username-cipm", formik?.values?.Email);
    //   localStorage.setItem("password-cipm", formik?.values?.Password);
    // }

    try {
      await lecturerSignUpMutation.mutateAsync(lecturerSignUp, {
        onSuccess: () => {
          notification.success({
            message: "Success",
            description: data.Message,
          });
          handleShowModal()
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
    Email: Yup.string()
      .required("Email Address is required")
      .email("Invalid email Address"),
    Password: Yup.string()
    .required("Password is required")
    .max(20, "Password must have a maximum length of 20 characters")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/,
      "The password must contain a mix of uppercase letters, lowercase letters, and numbers."
    ),
    ConfirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("Password")], "Passwords must match")
    .required("Confirm password is required"),
    FirstName: Yup.string().required("First Name is required"),
    LastName: Yup.string().required("Last Name is required"),
    PhoneNumber: Yup.string().required("Phone Number is required"),
  });

  const formik = useFormik<FormikValues>({
    initialValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
      Password: "",
      ConfirmPassword: "",
      // UserName:'',
    },
    onSubmit: (data, { resetForm }) => {
      lecturerSignUpHandler(data, resetForm);
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
         {/* <Field
          as={Input}
          name="User Name"
          placeholder="Enter UserName"
          displayInput="text"
          label="UserName"
        /> */}
        <Field
          as={Input}
          name="Email"
          placeholder=" Enter Email"
          displayInput="text"
          label="Email"
        />
        <Field
          as={Input}
          name="PhoneNumber"
          placeholder="Enter Phone Number"
          displayInput="text"
          label="Phone Number"
        />
        <Field
          as={Input}
          name="Password"
          placeholder=" Create Password"
          displayInput="password"
          label="Password"
        />
         <Field
          as={Input}
          name="ConfirmPassword"
          placeholder=" Confirm your Password"
          displayInput="password"
          label="Confirm Password"
        />
        <Button disabled={lecturerSignUpMutation?.isPending} text={lecturerSignUpMutation?.isPending ? "Creating..." : "Create Account"} />
      </form>

      {/* <p>
      Already have an account? 
        <span onClick={()=>{navigate('/sign-in')}} style={{ fontWeight: "700" }}>Sign Up</span>{" "}
      </p> */}

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
    </FormikProvider>


    </main>
    
  );
};

export default LecturerSignUp;
