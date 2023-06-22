import {  Route, Routes } from "react-router";
import Homepage from "../pages/homePage/homepage";
import SignInSide from "../pages/loginPage";
import Signup from "../pages/registerPage";
import Profile from "../pages/profile/Profile";
import HousingDetails from "../pages/housingDetails/housingDetails";
import ManageHousing from "../pages/manageHousing/manageHousing";
import WishList from "../pages/WishList/WishList";
import MyTrips from "../pages/MyTrips/MyTrips";
import { useSelector } from "react-redux";
import UserGurd from "../Gurd/UserGurd";


function Routers() {
  // to pass user's information  to gurd to check logined or no
  const getUserData = useSelector((state) => state.user)
  console.log(getUserData)
  return (
    <Routes>
      <Route path="Home" element={<Homepage/>} />
      <Route path="login" element={<SignInSide />} />
      <Route path="register" element={<Signup />} />
      <Route path="profile/" element={<UserGurd getUserData={getUserData} ><Profile /></UserGurd>} />
      <Route path="housingDetails/:apartmentId" element={<UserGurd getUserData={getUserData} ><HousingDetails /></UserGurd>} />
      <Route path="Manage Housing" element={<UserGurd getUserData={getUserData} ><ManageHousing /></UserGurd>} />
      <Route path="wishlist/" element={<UserGurd getUserData={getUserData} ><WishList /></UserGurd>} />
      <Route path="My Trips/" element={<UserGurd getUserData={getUserData} ><MyTrips /></UserGurd>} />
      <Route path="*" element={<Homepage />} />
    </Routes>
  );
}

export default Routers;
