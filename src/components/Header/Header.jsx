import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import useAuthCheck from "../../hooks/useAuthCheck.jsx";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const [modalOpened, setModalOpened] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const { validateLogin } = useAuthCheck();


  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };
  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to="/">
          <img src="data:image/png;base64,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" alt="SmartPropertyManagement" width={100} />
        </Link>

        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            // ref={menuRef}
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          >
            <NavLink to="/properties">Properties</NavLink>

            <a href="kenzydkenzy@gmail.com">Contact</a>

            {/* add property */}
            <div onClick={handleAddPropertyClick}>Add Property</div>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />
            {/* login button */}
            {!isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )}
          </div>
        </OutsideClickHandler>

        {/* for medium and small screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
