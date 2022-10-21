import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/homePage/HomePage";
import UserLogin from "./pages/userLogin/UserLogin";
import UserList from "./pages/userList/UserList";
import UserProfile from "./pages/userProfile/UserProfile";
import NewUser from "./pages/newUser/NewUser";

import { newUser } from "./forms/Register";
import { newProduct } from "./forms/Product";
import { DarkModeContext } from "./context/darkModeContext";

import "./styles/darkView.scss";

function App() {
  //
  const { darkMode } = useContext(DarkModeContext);

  // Configure secured routes for admin
  //
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/api-Admin">
            <Route index element={<HomePage />} />
            <Route path="login" element={<UserLogin />} />

            <Route path="all-Users">
              <Route index element={<UserList />} />
              <Route path=":userId" element={<UserProfile />} />
              <Route
                path="new"
                element={<NewUser inputs={newUser} title="Add New User" />}
              />
            </Route>

            <Route path="all-Products">
              <Route index />
              <Route path=":productId" />
              <Route
                path="new"
                element={
                  <NewUser inputs={newProduct} title="Add New Product" />
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
