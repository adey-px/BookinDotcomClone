import { useEffect } from "react";
import { createContext, useReducer } from "react";

//
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthsContext = createContext(INITIAL_STATE);

// Create reducer
const AuthsReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// Use the reducer in the context, use this to wrap entire app in index.js
export const AuthsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthsReducer, INITIAL_STATE);

  // Save user into local storage, avoid logout after refresh
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthsContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthsContext.Provider>
  );
};
