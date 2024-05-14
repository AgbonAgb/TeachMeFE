import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/authLayout/main";
import ErrorPage from "./components/errorPage/errorPage";
import SignUp from "./components/auth/sign-up";
import SignIn from "./components/auth/signIn/signIn";
import LecturerProfile from "./components/lecturer/updateProfile/updateProfile";


function App() {
  return (
 
    <Routes>
      <Route element={<AuthLayout />}>
        <Route element={<ErrorPage />} path="*" />
        <Route element={<SignUp />} path="/" />
      </Route>
      <Route element={<SignIn />} path="sign-in" />
      <Route element={<LecturerProfile />} path="lecturer-profile" />

    </Routes>
    
  
  );
}

export default App;
