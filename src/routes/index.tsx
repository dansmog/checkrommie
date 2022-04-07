import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../containers/Auth/Login";
import Signup from "../containers/Auth/Signup";
import LandingPage from "../containers/LandingPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
