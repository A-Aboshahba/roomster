import { Container } from "@mui/material";
import Navbar from "./components/navbar.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Routers from "./Routes/Routers.jsx";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/Slices/userSlice.jsx";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { fetchCurrency } from "./store/Slices/currency.jsx";
import Footer from "./components/Footer/Footer";

const App = () => {
  const dispatch = useDispatch();
  const [path, setPath] = useState("");
  const getPathName = (pathName) => {
    setPath(pathName);
  };

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
      {!path.includes("/dashboard") && <Navbar />}
      <Container maxWidth="xl" sx={{ minHeight: "80vh" }}>
        <Routers getPathName={getPathName} />
      </Container>
      {!path.includes("/dashboard") && <Footer />}

      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
