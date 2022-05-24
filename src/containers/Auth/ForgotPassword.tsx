import "./auth.styles.css";

import heroImage from "../../assets/images/hero-photo.png";
import { Link } from "react-router-dom";
import User from "../../assets/images/user";
import Padlock from "../../assets/images/padlock";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import httpRequestHelper from "../utils/httpRequest.helper";
import Spinner from "../../assets/images/spinner";

interface IData {
  email: string;
}
const ForgotPassword = () => {
  const [data, setData] = useState<IData>({ email: "" });
  const [isLoading, setLoading] = useState(false);

  const onHandleInputChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    const payload = data;
    if (!data.email) {
      return;
    } else {
      setLoading(true);
      try {
        const { data } = await httpRequestHelper.post(
          "/auth/forgot-password",
          payload
        );
        toast.success(
          "A password reset instruction has been sent to your email"
        );
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data.message);
        }
        console.log({
          message: err.response.data.message,
          status: err.response.status,
        });
      }
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
            <h1>Forgot Password</h1>
            <span>
              I remember my password? <Link to="/login">Log in here</Link>
            </span>
          </div>
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
          <button onClick={onSubmit}>
            {isLoading ? <Spinner /> : "Send Reset instructions"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;