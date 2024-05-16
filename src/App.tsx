import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/authLayout/main";
import ErrorPage from "./components/errorPage/errorPage";
import SignUp from "./components/auth/sign-up";
import SignIn from "./components/auth/signIn/signIn";
import LecturerProfile from "./components/lecturer/updateProfile/updateProfile";
import LecturerDashboardLayout from "./components/lecturer/dashboardLayout/dashboardLayout";
import LecturerAccountDetails from "./components/lecturer/setupAccountDetails/accountDetails.tsx";
import LecturerContentManagement from "./components/lecturer/contentManagement/contentManagement";
import LecturerUploadContent from "./components/lecturer/contentManagement/modalContent/contentUpload";
import LecturerSubscriptions from "./components/lecturer/mySubscriptions/subscriptionContent";
import LecturerMessage from "./components/lecturer/messages/message";
import LecturerChangePassword from "./components/lecturer/changePassword/changePassword";
import LecturerPayment from "./components/lecturer/payment/payment";


import DashboardLayout from "./components/dashboardLayout/dashboardLayout";
import Overview from "./components/overview/overview";
import Subscribe from "./components/subscribe/subscribe";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route element={<ErrorPage />} path="*" />
        <Route element={<SignUp />} path="/" />
      </Route>
      <Route element={<SignIn />} path="sign-in" />

      <Route element={<DashboardLayout />}>
        <Route element={<Overview />} path="/overview" />
        <Route element={<Subscribe />} path="/subscribe" />
      
      </Route>

      <Route element={<LecturerDashboardLayout />}>
      <Route element={<LecturerProfile />} path="/profile-update" />
      <Route element={<LecturerAccountDetails />} path="/setup-bank" />
      <Route element={<LecturerContentManagement />} path="/content-management" />
      <Route element={<LecturerUploadContent />} path="/upload-content" />
      <Route element={<LecturerSubscriptions />} path="/my-subscription" />
      <Route element={<LecturerMessage />} path="/messages" />
      <Route element={<LecturerChangePassword />} path="/change-password" />
      <Route element={<LecturerPayment />} path="/my-payment" />


      </Route>

    
    </Routes>
  );
}

export default App;
