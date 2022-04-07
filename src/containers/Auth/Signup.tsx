import "./auth.styles.css";

import heroImage from "../../assets/images/hero-photo.png";
import { Link } from "react-router-dom";
import User from "../../assets/images/user";
import Padlock from "../../assets/images/padlock";

const Signup = () => {
  return (
    <section className="auth">
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
            <label>Email</label>
            <input type="email" alt="" />
            <span className="input--icon">
              <User />
            </span>
          </div>
          <div className="input__wrapper">
            <label>Password</label>
            <input type="password" alt="" />

            <span className="input--icon">
              <Padlock />
            </span>
          </div>
          <button>Create an account</button>
        </div>
      </div>
    </section>
  );
};

export default Signup;
