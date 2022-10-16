import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthsContext } from "../../contextApi/AuthsContext";
import "./userLogin.css";

const UserLogin = () => {
  //
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  // From AuthsContext, also used in navbar login
  const { loading, error, dispatch } = useContext(AuthsContext);

  const inputHandler = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // If login succeeds, to redirect
  const navigate = useNavigate();

  // Login button
  const loginBtn = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auths/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          id="username"
          placeholder="username"
          className="lInput"
          onChange={inputHandler}
        />

        <input
          type="password"
          id="password"
          placeholder="password"
          className="lInput"
          onChange={inputHandler}
        />

        <button className="lButton" disabled={loading} onClick={loginBtn}>
          Login
        </button>

        {/* If there is error, display error message */}
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default UserLogin;
