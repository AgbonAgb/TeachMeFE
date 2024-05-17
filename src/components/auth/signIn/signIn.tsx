import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";
import styles from "./styles.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "../../../custom/checkbox/checkbox";
import { useAtom } from "jotai";
import { userAtom } from "../../../store/store";
import { useMutation } from "@tanstack/react-query";
import { App, Modal } from "antd";
import SuccessModal from "../signUps/modalContent/successModal";
import { useEffect } from "react";
import { errorMessage } from "../../utils/errorMessage";
import { LoginCall } from "../../../requests";

const SignIn = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (user && user?.Token && user?.UserType === "Lecturer") {
      navigate("/lecturer-profile");
    } else if (user && user?.Token && user?.UserType === "Student") {
      navigate("/overview");
    }
  }, []);

  // const login = async (data: LoginPayload) => {
  //   return (await apiCall().post("/Authentication/Authenticate", data))
  //     ?.data as LoginData;
  // };

  const loginMutation = useMutation({
    mutationFn: LoginCall,
    mutationKey: ["post-user"],
  });

  const loginHandler = async (data: FormikValues, resetForm: () => void) => {
    const loginUser: LoginPayload = {
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
          notification.success({
            message: "Success",
            description: data.Message,
          });

          setUser({
            UserType: data?.UserType,
            Message: data?.Message,
            UserId: data?.UserId,
            StatusCode: data?.StatusCode,
            Token: data?.Token,
          });
          {
            data?.UserType === "Lecturer"
              ? navigate("/lecturer-profile"):
              data?.UserType === "Student" ?
              navigate("/overview") :  navigate("/");
          }
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
    <main className={styles.main}>
      <FormikProvider value={formik}>
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

              <Button
                disabled={loginMutation?.isPending}
                text={loginMutation?.isPending ? "Loading..." : "Login"}
              />

              <p>
                Don’t have an account?{" "}
                <Link to={"/"} className={styles.signUp}>
                  Sign Up
                </Link>{" "}
              </p>
            </form>
          </div>
        </section>
      </FormikProvider>
    </main>
  );
};

export default SignIn;
