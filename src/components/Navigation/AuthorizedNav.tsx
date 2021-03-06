import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import User from "../../assets/images/user";
import Logo from "../../assets/images/rommie_logo_blue.png";

import "./navigation.styles.css";
import Menu from "../../assets/images/Menu";
import MobileMenu from "../MobileMenu";

const AuthorizedNav = () => {
  const [user, setUser] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const logout = () => {
    window.localStorage.removeItem("checkrommie__user");
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

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
              <div className="navigation__left">
                <NavLink to="/">
                  <img src={Logo} alt="logo" className="logo" />
                </NavLink>
              </div>
              <div className="navigation__right">
                <NavLink to="/explore" className="hidden-lg show-sm">
                  Explore
                </NavLink>
                <NavLink to="/apartment" className="hidden-sm show-sm">
                  My apartment
                </NavLink>
                <NavLink to="/profile" className="hidden-sm">
                  My Profile
                </NavLink>
                <Link to="/login" className="hidden-sm" onClick={logout}>
                  Log out
                </Link>
                <span className="hidden-sm">
                  <User />
                  {user && user}
                </span>
                <span className="hidden-lg show-sm" onClick={toggleMobileMenu}>
                  <Menu />
                </span>
              </div>
            </div>
          </div>
          <MobileMenu isOpen={showMobileMenu} onDismiss={toggleMobileMenu} />
        </div>
      </div>
    </section>
  );
};

export default AuthorizedNav;
