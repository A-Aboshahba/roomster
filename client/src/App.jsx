import { Container } from "@mui/material";
import Navbar from "./components/navbar.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Routers from "./Routes/Routers.jsx";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/Slices/userSlice.jsx";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { fetchCurrency } from "./store/Slices/currency.jsx";
import Footer from "./components/Footer/Footer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken._id;
      dispatch(fetchUser(userId));
      dispatch(fetchCurrency());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="xl" sx={{ minHeight: "80vh" }}>
        <Routers />
      </Container>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
