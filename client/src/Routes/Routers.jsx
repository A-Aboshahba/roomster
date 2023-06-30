import { Route, Routes } from "react-router";
import Homepage from "../pages/homePage/homepage";
import SignInSide from "../pages/loginPage";
import Signup from "../pages/registerPage";
import Profile from "../pages/profile/Profile";
import HousingDetails from "../pages/housingDetails/housingDetails";
import ManageHousing from "../pages/manageHousing/manageHousing";
import WishList from "../pages/WishList/WishList";
import MyTrips from "../pages/MyTrips/MyTrips";
import MessagePage from "../pages/messagePage/MessagePage";
import UserGuard from "../Gurd/UserGurd";
import UserApartments from "../pages/userApartments/UserApartments";

import ConfirmationPage from "../pages/ConfirmationPage ";

function Routers() {
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
        path="Message"
        element={
          // <UserGuard>
          <MessagePage />
          // </UserGuard>
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
      <Route path="*" element={<Homepage />} />
    </Routes>
  );
}

export default Routers;
