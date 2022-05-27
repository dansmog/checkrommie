import "./auth.styles.css";
import { ToastContainer, toast } from "react-toastify";

import heroImage from "../../assets/images/hero-photo.png";
import success from "../../assets/images/award.gif";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../assets/images/spinner";
import httpRequestHelper from "../utils/httpRequest.helper";

const ConfirmAccount = () => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const qparams = window.location.search;
    let params = new URLSearchParams(qparams);
    let token = params.get("token") as string;
    setLoading(true);
    submitData(token);
  }, []);

  const submitData = async (token: string) => {
    try {
   await httpRequestHelper.get(
        `/email-confirmation/confirm?token=${token}`
      );
      setLoading(false);
      setIsSuccess(true);
    } catch (err: any) {
      setLoading(false);
      if (err.response.status === 400) {
        toast.error(err.response.data.message);
  
      }
      if(err.response.data.message === "Email already confirmed"){
        setIsSuccess(true)
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
          {isLoading && (
            <>
              <div className="form__wrapperHeader">
                <h1>Confirm your account</h1>
                <span>Please hold on while we verify your account</span>
              </div>
              <div className="input__wrapper loader__container">
                <div className="wrapper">
                  <Spinner />
                  <span>Please wait, verifying acccount...</span>
                </div>
              </div>
            </>
          )}
          {isSuccess && (
            <div className="success__container">
              <img src={success} alt="" style={{ width: 100, height: 100 }} />
              <p>Your account has been successfully confirmed</p>
              <Link to="/login">Click here to login</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConfirmAccount;
