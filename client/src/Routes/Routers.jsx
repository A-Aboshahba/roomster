import { Route, Routes, useLocation } from "react-router";
import Homepage from "../pages/homePage/homepage";
import SignInSide from "../pages/loginPage";
import Signup from "../pages/registerPage";
import Profile from "../pages/profile/Profile";
import HousingDetails from "../pages/housingDetails/housingDetails";
import ManageHousing from "../pages/manageHousing/manageHousing";
import WishList from "../pages/WishList/WishList";
import MyTrips from "../pages/MyTrips/MyTrips";
import UserGuard from "../Gurd/UserGurd";
import UserApartments from "../pages/userApartments/UserApartments";
import jwt_decode from "jwt-decode";
import ConfirmationPage from "../pages/ConfirmationPage ";
import React, { useEffect, useState } from "react";
import Users from "../pages/dashboardPage/users/Users";
import Team from "../pages/dashboardPage/team/Team";
import Topbar from "../pages/dashboardPage/global/Topbar";
import Sidebar from "../pages/dashboardPage/global/Sidebar";
import Geography from "../pages/dashboardPage/geography";
import Form from "../pages/dashboardPage/form";
import FAQ from "../pages/dashboardPage/faq";
import Dashboard from "../pages/dashboardPage/dashboard";
import CreateUser from "../pages/dashboardPage/createUser";
// import Calendar from "../pages/dashboardPage/calendar/calendar";
import ApartmentsInfo from "../pages/dashboardPage/apartments/ApartmentsInfo";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { useMode, ColorModeContext } from "../theme";
function Routers({ getPathName }) {
  function checkIsAdmin(props) {
    const token = localStorage.getItem("token");
    const data = jwt_decode(token);
    if (data.isAdmin) {
      return props.children;
    } else {
      return <Navigate to="/login" />;
    }
  }
  const location = useLocation();
  useEffect(() => {
    getPathName(location.pathname);
  });

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <Routes>
      <Route path="login" element={<SignInSide />} />
      <Route path="register" element={<Signup />} />
      <Route path="Home" element={<Homepage />} />
      <Route
        path="profile/"
        element={
          <UserGuard>
            <Profile />
          </UserGuard>
        }
      />
      <Route
        path="housingDetails/:apartmentId"
        element={
          <UserGuard>
            <HousingDetails />
          </UserGuard>
        }
      />
      <Route
        path="Manage Housing"
        element={
          <UserGuard>
            <UserApartments />
          </UserGuard>
        }
      />
      <Route
        path="apartment/modify"
        element={
          <UserGuard>
            <ManageHousing />
          </UserGuard>
        }
      />
      <Route
        path="wishlist/"
        element={
          <UserGuard>
            <WishList />
          </UserGuard>
        }
      />
      <Route
        path="My Trips/"
        element={
          <UserGuard>
            <MyTrips />
          </UserGuard>
        }
      />
      <Route
        path="success"
        element={
          <UserGuard>
            <ConfirmationPage />
          </UserGuard>
        }
      />
      <Route path="dashboard">
        <Route
          path=""
          element={
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <Dashboard />
                  </main>
                </div>
              </ThemeProvider>
            </ColorModeContext.Provider>
          }
        />
        <Route
          path="team"
          element={
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <Team />
                  </main>
                </div>
              </ThemeProvider>
            </ColorModeContext.Provider>
          }
        />

        <Route
          path="users"
          element={
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <Users />
                  </main>
                </div>
              </ThemeProvider>
            </ColorModeContext.Provider>
          }
        />
        <Route
          path="apartmentsInfo"
          element={
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <ApartmentsInfo />
                  </main>
                </div>
              </ThemeProvider>
            </ColorModeContext.Provider>
          }
        />
        <Route
          path="createUser"
          element={
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <CreateUser />
                  </main>
                </div>
              </ThemeProvider>
            </ColorModeContext.Provider>
          }
        />
      </Route>

      <Route path="*" element={<Homepage />} />
    </Routes>
  );
}

export default Routers;
