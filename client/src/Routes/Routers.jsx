import { Route, Routes } from 'react-router'
import Homepage from '../pages/homePage/homepage'
import SignInSide from '../pages/loginPage'
import Signup from '../pages/registerPage'
import Profile from '../pages/profile/Profile'
import HousingDetails from '../pages/housingDetails/housingDetails'
import ManageHousing from '../pages/manageHousing/manageHousing'

function Routers() {
    return (
        <Routes>
            <Route path="Home" element={<Homepage />} />
            <Route path="login" element={<SignInSide />} />
            <Route path="register" element={<Signup />} />
            <Route path="profile" element={<Profile />} />
            <Route path="housingDetails/:id" element={<HousingDetails />} />
            <Route path="Manage Housing" element={<ManageHousing />} />
            <Route path="*"   element={<Homepage />} />

        </Routes>
    )
}

export default Routers