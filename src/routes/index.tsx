import { BrowserRouter, Route, Routes } from "react-router-dom";
import Apartment from "../containers/Apartment";
import ConfirmAccount from "../containers/Auth/ConfirmAccount";
import ForgotPassword from "../containers/Auth/ForgotPassword";
import Login from "../containers/Auth/Login";
import ResetPassword from "../containers/Auth/ResetPassword";
import Signup from "../containers/Auth/Signup";
import Explore from "../containers/Explore";
import LandingPage from "../containers/LandingPage";
import About from "../containers/MarketingPages/About";
import Privacy from "../containers/MarketingPages/Privacy";
import Terms from "../containers/MarketingPages/Terms";
import Profile from "../containers/Profile";
import ProtectedRoute, { PublicRoute } from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/email-confirmation/confirm"
          element={<ConfirmAccount />}
        />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset" element={<ResetPassword />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apartment"
          element={
            <ProtectedRoute>
              <Apartment />
            </ProtectedRoute>
          }
        />
        <Route path="/explore" element={<Explore />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-of-use" element={<Terms />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
