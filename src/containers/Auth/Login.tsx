import "./auth.styles.css";

import heroImage from "../../assets/images/hero-photo.png";
import { Link } from "react-router-dom";
import User from "../../assets/images/user";
import Padlock from "../../assets/images/padlock";

const Login = () => {
  return (
    <section className="auth">
      <div className="left__section">
        <img src={heroImage} alt="" />
      </div>
      <div className="right__section">
        <div className="form__wrapper">
          <div className="form__wrapperHeader">
            <h1>Log in</h1>
            <span>
              Don't have an account yet? <Link to="/signup">Create an account</Link>
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
            <Link to="/forgot">Forgot password</Link>
            <span className="input--icon">
              <Padlock />
            </span>
          </div>
          <button>Log in</button>
        </div>
      </div>
    </section>
  );
};

export default Login;
