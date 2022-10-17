import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthsContextProvider } from "./context/AuthsContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthsContextProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </AuthsContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
