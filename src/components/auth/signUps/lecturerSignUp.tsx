import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";
import { useNavigate } from "react-router-dom";
import apiCall from "../../utils/apiCall";
import { useMutation } from "@tanstack/react-query";

interface Payload {
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  Password: string;
}
const LecturerSignUp = () => {
  const navigate = useNavigate();

  const lecturerSignUpApi = async (data: Payload) => {
    return (await apiCall().post("/Authentication/RegisterLecturer", data))
      ?.data;
  };

  const lecturerSignUpMutation = useMutation({
    mutationFn: lecturerSignUpApi,
    mutationKey: ["create-lecturer"],
  });

  const lecturerSignUpHandler = async (
    data: FormikValues,
    resetForm: () => void
  ) => {
    const lecturerSignUp: Payload = {
      FirstName: data?.FirstName?.trim(),
      LastName: data?.LastName?.trim(),
      Email: data?.Email?.trim(),
      PhoneNumber: data?.PhoneNumber?.trim(),
      Password: data?.Password?.trim(),
    };
    // if (isChecked) {
    //   localStorage.setItem("username-cipm", formik?.values?.Email);
    //   localStorage.setItem("password-cipm", formik?.values?.Password);
    // }

    try {
      await lecturerSignUpMutation.mutateAsync(lecturerSignUp, {
        onSuccess: () => {
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
    },
    onSubmit: (data, { resetForm }) => {
      lecturerSignUpHandler(data, resetForm);
    },
    validationSchema: validationRules,
  });

  return (
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
        <Button text={"Create Account"} />
      </form>

      <p>
      Already have an account? 
        <span onClick={()=>{navigate('/sign-in')}} style={{ fontWeight: "700" }}>Sign Up</span>{" "}
      </p>
    </FormikProvider>
  );
};

export default LecturerSignUp;
