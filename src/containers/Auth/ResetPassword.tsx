import "./auth.styles.css";

import heroImage from "../../assets/images/hero-photo.png";
import { Link } from "react-router-dom";
import User from "../../assets/images/user";
import Padlock from "../../assets/images/padlock";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import httpRequestHelper from "../utils/httpRequest.helper";
import Spinner from "../../assets/images/spinner";
import VisibleEyes from "../../assets/images/visibleEye";

interface IData {
  password: string;
  password_confirm: string;
}
const ResetPassword = () => {
  const [data, setData] = useState({ password: "", password_confirm: "" });
  const [isLoading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onHandleInputChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = async () => {
    console.log("working");
    const payload = {
      ...data,
      token,
    };
    const { password, password_confirm } = data;
    console.log({ password, password_confirm });
    if (!password || !password_confirm) {
      return;
    }
    if (password !== password_confirm) {
      return;
    } else {
      setLoading(true);
      console.log("workig here");
      try {
        const { data } = await httpRequestHelper.post(
          `/auth/reset-password`,
          payload
        );
        toast.success("Password reset successfully, redirecting to login page");
        setLoading(false);
        setTimeout(() => {
          window.location.replace("/login");
        }, 3000);
      } catch (err: any) {
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data.message[0]);
          setError(err.response.data.message);
          console.log("i am here");
        }

        console.log({
          message: err.response.data.message,
          status: err.response.status,
        });
      }
    }
  };

  useEffect(() => {
    const qparams = window.location.search;
    let params = new URLSearchParams(qparams);
    let token = params.get("token") as string;
    setToken(token);
  }, []);

  useEffect(() => {
    console.log({ error });
  }, [error]);

  return (
    <section className="auth">
      <ToastContainer />
      <div className="left__section">
        <img src={heroImage} alt="" />
      </div>
      <div className="right__section">
        <div className="form__wrapper">
          <div className="form__wrapperHeader">
            <h1>Reset password</h1>
            <span>Enter your new password</span>
          </div>
          {error && (
            <div className="password__error">
              <p>
                {error} <Link to="/forgot">Reset password</Link>
              </p>
            </div>
          )}
          <div className="input__wrapper">
            <label>Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              alt=""
              name="password"
              onChange={onHandleInputChange}
            />
            <span className="input--icon">
              <Padlock />
            </span>
            <span className="input--icon right" onClick={toggleVisibility}>
              <VisibleEyes />
            </span>
          </div>
          <div className="input__wrapper">
            <label>Confirm password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              alt=""
              name="password_confirm"
              onChange={onHandleInputChange}
            />
            <span className="input--icon">
              <Padlock />
            </span>
            <span className="input--icon right" onClick={toggleVisibility}>
              <VisibleEyes />
            </span>
          </div>
          <button onClick={onSubmit}>
            {isLoading ? <Spinner /> : "Reset your password"}
          </button>
          <span style={{ paddingTop: 16, display: "block" }}>
            Back to login <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
