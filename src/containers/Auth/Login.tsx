import "./auth.styles.css";

import heroImage from "../../assets/images/hero-photo.png";
import { Link } from "react-router-dom";
import User from "../../assets/images/user";
import Padlock from "../../assets/images/padlock";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import httpRequestHelper from "../utils/httpRequest.helper";
import Spinner from "../../assets/images/spinner";
import VisibleEyes from "../../assets/images/visibleEye";

interface IData {
  email: string;
  password: string;
}
const Login = () => {
  const [data, setData] = useState<IData>({ email: "", password: "" });
  const [isLoading, setLoading] = useState(false);
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
    const payload = data;
    const { email, password } = data;
    if (!email || !password) {
      return;
    } else {
      setLoading(true);
      try {
        const { data } = await httpRequestHelper.post("/auth/login", payload);
        setLoading(false);
        toast.success("Log in successful");
        window.localStorage.setItem(
          "checkrommie__user",
          JSON.stringify(data.data.user)
        );
        window.localStorage.setItem(
          "checkrommie__token",
          JSON.stringify(data.data.token)
        );
        setTimeout(() => {
          window.location.replace("/profile");
        }, 3000);
      } catch (err: any) {
        setLoading(false);
        console.log(err);
        if (
          err.response.status === 401 &&
          err.response.data.message === "Kindly confirm your email address"
        ) {
          toast.error(err.response.data.message);
          return setError(err.response.data.message);
        }
        if (err.response.status === 400) {
          return toast.error(err.response.data.message);
        }
      }
    }
  };

  const resendConfirmation = async () => {
    const payload = {
      email: data.email,
    };
    try {
      await httpRequestHelper.post("/email-confirmation/resend-link", payload);
      toast.success("Please check your email");
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      if (err.response.status === 400) {
        return toast.error(err.response.data.message);
      }
      console.log({
        message: err.response.data.message,
        status: err.response.status,
      });
    }
  };

  return (
    <section className="auth">
      <ToastContainer />
      <div className="left__section">
        <img src={heroImage} alt="" />
      </div>
      <div className="right__section">
        <div className="form__wrapper">
          <div className="form__wrapperHeader">
            <h1>Log in</h1>
            <span>
              Don't have an account yet?{" "}
              <Link to="/signup">Create an account</Link>
            </span>
          </div>
          {error && (
            <div className="password__error">
              <p>
                {error}{" "}
                <span
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={resendConfirmation}
                >
                  Resend confirmation token
                </span>
              </p>
            </div>
          )}
          <div className="input__wrapper">
            <label>Email</label>
            <input
              type="email"
              alt=""
              name="email"
              onChange={onHandleInputChange}
            />
            <span className="input--icon">
              <User />
            </span>
          </div>
          <div className="input__wrapper">
            <label>Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              alt=""
              name="password"
              onChange={onHandleInputChange}
            />
            <Link to="/forgot">Forgot password</Link>
            <span className="input--icon">
              <Padlock />
            </span>
            <span className="input--icon right" onClick={toggleVisibility}>
              <VisibleEyes />
            </span>
          </div>
          <button onClick={onSubmit}>
            {isLoading ? <Spinner /> : "Log in"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
