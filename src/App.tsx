import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/authLayout/main";
import SignIn from "./components/auth/sign-in";
import ErrorPage from "./components/errorPage/errorPage";
function App() {
  return (
    <Router>
        <Routes>
      <Route element={<AuthLayout />}>
        <Route element={<ErrorPage />} path="*" />
        <Route element={<SignIn />} path="/" />
      </Route>
    </Routes>
    </Router>
  
  );
}

export default App;
