import "./auth.styles.css";
import { ToastContainer, toast } from "react-toastify";

import heroImage from "../../assets/images/hero-photo.png";
import { Link } from "react-router-dom";
import User from "../../assets/images/user";
import Padlock from "../../assets/images/padlock";
import Email from "../../assets/images/email";
import { useState } from "react";
import Spinner from "../../assets/images/spinner";
import httpRequestHelper from "../utils/httpRequest.helper";

interface IData {
  email: string;
  gender: string;
  password: string;
  name: string;
}
const Signup = () => {
  const [data, setData] = useState<IData>({
    email: "",
    gender: "",
    password: "",
    name: "",
  });
  const [isLoading, setLoading] = useState(false);

  const onHandleInputChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    const payload = data;
    console.log({ payload });
    const { email, gender, password, name } = data;
    if (!email || !gender || !password || !name) {
      return;
    } else {
      setLoading(true);
      try {
        const { data } = await httpRequestHelper.post("/auth/signup", payload);
        toast.success("Account created successfully, please check your email");
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
            <h1>Create an account</h1>
            <span>
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </div>
          <div className="input__wrapper">
            <label>Full name</label>
            <input
              type="name"
              alt=""
              name="name"
              onChange={onHandleInputChange}
            />
            <span className="input--icon">
              <User />
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
              <Email />
            </span>
          </div>
          <div className="input__wrapper">
            <label>Password</label>
            <input
              type="password"
              alt=""
              name="password"
              onChange={onHandleInputChange}
            />
            <span className="input--icon">
              <Padlock />
            </span>
          </div>
          <section className="gender__wrapper">
            <label>
              <input
                type="radio"
                value="male"
                name="gender"
                onChange={onHandleInputChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="female"
                name="gender"
                onChange={onHandleInputChange}
              />
              Female
            </label>
          </section>
          <button onClick={onSubmit}>
            {isLoading ? <Spinner /> : "Create account"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Signup;
