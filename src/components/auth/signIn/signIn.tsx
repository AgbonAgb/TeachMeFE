import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";
import styles from "./styles.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "../../../custom/checkbox/checkbox";
import { useAtom } from "jotai";
import { userAtom } from "../../../utils/store";
import { useMutation } from "@tanstack/react-query";
import apiCall from "../../../utils/apiCall";

interface Payload {
  Email: string;
  Password: string;
}
interface LoginData {
  AdminUserHasChangePassword: boolean;
  FirstName: string;
  Id: string;
  Message: string;
  RoleIds: string[];
  StatusCode: number;
  Token: string;
  UserName: string;
  expiryDate: string;
  RoleNames: string[];
}

const SignIn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  const login = async (data: Payload) => {
    return (await apiCall().post("/Authentication/Authenticate", data))
      ?.data as LoginData;
  };

  const loginMutation = useMutation({
    mutationFn: login,
    mutationKey: ["post-user"],
  });

  const loginHandler = async (data: FormikValues, resetForm: () => void) => {
    const loginUser: Payload = {
      Email: data?.Email?.trim(),
      Password: data?.Password?.trim(),
    };
    // if (isChecked) {
    //   localStorage.setItem("username-cipm", formik?.values?.Email);
    //   localStorage.setItem("password-cipm", formik?.values?.Password);
    // }

    try {
      await loginMutation.mutateAsync(loginUser, {
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

  const validationRules = Yup.object().shape({
    Email: Yup.string()
      .required("Email Address is required")
      .email("Invalid email Address"),
    Password: Yup.string().required("Password is required"),
  });

  const formik = useFormik<FormikValues>({
    initialValues: {
      Email: "",
      Password: "",
    },
    onSubmit: (data, { resetForm }) => {
      loginHandler(data, resetForm);
    },
    validationSchema: validationRules,
  });
  return (
    <FormikProvider value={formik}>
      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.card}>
            <div className={styles.header}>
              <h1 className={styles.welcome}>Welcome</h1>
              <p>Create your account</p>
            </div>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
              <Field
                as={Input}
                name="Email"
                placeholder="Enter Email Address"
                displayInput="text"
                label="Email Address"
              />
              <Field
                as={Input}
                name="Password"
                placeholder=" Enter Password"
                displayInput="password"
                label="Password"
              />

              <div className={styles.group}>
                <span style={{ display: "flex" }}>
                  <Field name="isChecked" as={Checkbox} />

                  <label>Remember me</label>
                </span>

                <Link to={"/forgot-password"} className={styles.forgotPassword}>
                  Forgot Password?
                </Link>
              </div>

              <Button  text={"Login"} />

              <p >
                Don’t have an account?{" "}
                <span onClick={()=>{navigate('/')}} className={styles.signUp}>Sign Up</span>{" "}
              </p>
            </form>
          </div>
        </section>
      </main>
    </FormikProvider>
  );
};

export default SignIn;
