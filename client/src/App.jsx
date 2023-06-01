import { Container } from '@mui/material';
import Navbar from './components/navbar.jsx';
import Homepage from './pages/homePage/homepage.jsx';
import Footer from './components/Footer.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInSide from './pages/loginPage.jsx';
import Signup from './pages/registerPage.jsx';
import Profile from './pages/profile/Profile.jsx';


function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth='xl' >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="login" element={<SignInSide />}/>
            <Route path="register" element={<Signup />}/>
            <Route path="profile" element={<Profile />}/>
          </Routes>
        </BrowserRouter>

      </Container>
      <Footer />
    </>
  )
}

export default App
