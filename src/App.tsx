import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/authLayout/main";
import ErrorPage from "./components/errorPage/errorPage";
import SignUp from "./components/auth/sign-up";
import SignIn from "./components/auth/signIn/signIn";
import LecturerProfile from "./components/lecturer/updateProfile/updateProfile";
import DashboardLayout from "./components/dashboardLayout/dashboardLayout";
import Overview from "./components/student/overview/overview";
import Subscribe from "./components/student/subscribe/subscribe";
import SearchMaterials from "./components/student/searchMaterials/searchMaterials";
import MyPaidMaterials from "./components/student/paidMaterials/paidMaterials";
import Messages from "./components/student/messages/messages";
import SendMessage from "./components/student/messages/sendMessage";
import MessagesResponse from "./components/student/messages/messageResponse";
import ChangePassword from "./components/student/changePassword/changePassword";

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
        <Route element={<SearchMaterials />} path="/materials" />
        <Route element={<MyPaidMaterials />} path="/my-paid-materials" />
        <Route element={<Messages />} path="/messages" />
        <Route element={<SendMessage />} path="/send-message" />
        <Route element={<MessagesResponse />} path="/message/view" />
        <Route element={<ChangePassword />} path="/change-password" />
        <Route element={<LecturerProfile />} path="lecturer-profile" />

      </Route>
    </Routes>
  );
}

export default App;
