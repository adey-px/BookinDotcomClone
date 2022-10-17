import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthsContext } from "../../context/AuthsContext";
import axios from "axios";

import "./login.scss";

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
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not authorized" },
        });
      }
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
