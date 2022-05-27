import { MouseEventHandler } from "react";
import { NavLink, Link } from "react-router-dom";

import "./mobilemenu.styles.css";
import Close from "../../assets/images/close";
import Rodal from "rodal";

const MobileMenu = ({
  isOpen,
  onDismiss,
}: {
  isOpen: boolean;
  onDismiss: MouseEventHandler<HTMLSpanElement>;
}) => {
  const logout = () => {
    window.localStorage.removeItem("checkrommie__user");
    window.location.reload();
  };

  return (
    <Rodal
      className="mobile-nav"
      visible={isOpen}
      onClose={onDismiss}
      showCloseButton={false}
    >
      <div className="mobile-nav__container" aria-label="menu">
        <div className="container close-wrapper">
          <div className="row">
            <div className="mobile-nav__close">
              <Close onClick={onDismiss} />
            </div>
          </div>
        </div>
        <div className="mobile-nav__wrapper">
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/apartment">My apartment</NavLink>
          <NavLink to="/profile">My Profile</NavLink>
          {!window.localStorage.getItem("checkrommie__user") ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          ) : (
            <Link to="/login" onClick={logout}>
              Log out
            </Link>
          )}
        </div>
      </div>
    </Rodal>
  );
};

export default MobileMenu;
