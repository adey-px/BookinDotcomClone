import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthsContext } from "./context/AuthsContext";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import "./style/dark.scss";

function App() {
  //
  const { darkMode } = useContext(DarkModeContext);

  //
  const ProtectRoute = ({ children }) => {
    const { user } = useContext(AuthsContext);

    // If not admin
    if (!user) {
      return <Navigate to="/login" />;
    }
    // else
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectRoute>
                  <Home />
                </ProtectRoute>
              }
            />

            <Route path="users">
              <Route
                index
                element={
                  <ProtectRoute>
                    <List />
                  </ProtectRoute>
                }
              />

              <Route
                path=":userId"
                element={
                  <ProtectRoute>
                    <Single />
                  </ProtectRoute>
                }
              />

              <Route
                path="new"
                element={
                  <ProtectRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectRoute>
                }
              />
            </Route>

            <Route path="products">
              <Route index element={<List />} />
              <Route
                path=":productId"
                element={
                  <ProtectRoute>
                    <Single />
                  </ProtectRoute>
                }
              />

              <Route
                path="new"
                element={
                  <ProtectRoute>
                    <New inputs={productInputs} title="Add New Product" />
                  </ProtectRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
