import { Container } from "@mui/material";
import Navbar from "./components/navbar.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Routers from "./Routes/Routers.jsx";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, setSocket } from "./store/Slices/userSlice.jsx";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { fetchCurrency } from "./store/Slices/currency.jsx";
import Footer from "./components/Footer/Footer";
import { io } from "socket.io-client";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user?.user;
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken._id;
      dispatch(fetchUser(userId));
      dispatch(fetchCurrency());
      const socket = io("http://localhost:3030");
      socket.emit("addUser", userId);
      dispatch(setSocket(socket));
      console.log(socket);
    }
  }, [dispatch, user._id]);

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
