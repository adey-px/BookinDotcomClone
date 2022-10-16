import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthsContext } from "../../contextApi/AuthsContext";
import "./navbarComp.css";

const NavbarComp = () => {
  // From AuthsContext
  const { user } = useContext(AuthsContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">
          <Link to="/">FlywiseBooking</Link>
        </span>

        {user ? (
          ["Hello, ", user.username]
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarComp;
