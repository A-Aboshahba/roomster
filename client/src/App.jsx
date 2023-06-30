import { Container } from "@mui/material";
import Navbar from "./components/navbar.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Routers from "./Routes/Routers.jsx";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/Slices/userSlice.jsx";
import { useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import { fetchCurrency } from "./store/Slices/currency.jsx";
import Footer from "./components/Footer/Footer";
import { io } from "socket.io-client";
import Roomster from "./API/config.jsx";

function App() {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState(null);
  const { user } = useSelector((state) => state.user);
  const socket = useRef();
  useEffect(() => {
    if (user._id !== "") {
      socket.current = io("http://localhost:8080");
      socket.current.emit("addUser", user._id);
    }
  }, [user._id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken._id;
      dispatch(fetchUser(userId));
      dispatch(fetchCurrency());
      // socket.current = io("http://localhost:8080");
      // socket.current.emit("addUser", userId);
    }
  }, [dispatch]);

  useEffect(() => {
    const getNotifications = async () => {
      const { data } = await Roomster.get(
        `notifications/${"647bc39625b8e3a36759d3b4"}`
      );
      setNotifications(data);
    };
    getNotifications();
  }, []);
  return (
    <BrowserRouter>
      <Navbar socket={socket} notifications={notifications} />
      <Container maxWidth="xl" sx={{ minHeight: "80vh" }}>
        <Routers />
      </Container>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
