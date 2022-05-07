import { BrowserRouter, Route, Routes } from "react-router-dom";
import Apartment from "../containers/Apartment";
import ConfirmAccount from "../containers/Auth/ConfirmAccount";
import ForgotPassword from "../containers/Auth/ForgotPassword";
import Login from "../containers/Auth/Login";
import ResetPassword from "../containers/Auth/ResetPassword";
import Signup from "../containers/Auth/Signup";
import LandingPage from "../containers/LandingPage";
import Profile from "../containers/Profile";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/email-confirmation/confirm"
          element={<ConfirmAccount />}
        />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/apartment" element={<Apartment />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
