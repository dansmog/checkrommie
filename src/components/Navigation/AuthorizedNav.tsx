import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import User from "../../assets/images/user";


import "./navigation.styles.css"

const AuthorizedNav = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    /** @ts-ignore */
    const user = JSON.parse(window.localStorage.getItem("checkrommie__user"));
    if (user) {
      setUser(user?.user?.name);
    } else {
      window.location.replace("/login");
    }
  }, []);
  return (
    <section className="navigation">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="navigation__wrapper d-flex justify-content-between">
              <div className="navigation__left"></div>
              <div className="navigation__right">
                <NavLink to="/explore">Explore</NavLink>
                <Link to="/login">Log out</Link>
                <span>
                  <User />
                  {user && user}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorizedNav;
