import { MouseEventHandler, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { DialogOverlay, DialogContent } from "@reach/dialog";

import "./mobilemenu.styles.css";
import Close from "../../assets/images/close";

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
    <DialogOverlay
      className="mobile-nav hidden-lg show-sm"
      isOpen={isOpen}
      onDismiss={onDismiss}
    >
      <DialogContent className="mobile-nav__container" aria-label="menu">
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
          <Link to="/login" onClick={logout}>
            Log out
          </Link>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default MobileMenu;
