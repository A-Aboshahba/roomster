import { Container } from "@mui/material";
import Navbar from "./components/navbar.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Routers from "./Routes/Routers.jsx";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import { fetchCurrency } from "./store/Slices/currency.jsx";
import Footer from "./components/Footer/Footer";
import { io } from "socket.io-client";
import Roomster from "./API/config.jsx";
import { fetchUsers } from "./store/Slices/AllUsersSlice.jsx";
import { getApartments } from "./store/Slices/apartment.js";
import { fetchUser } from "./store/Slices/userSlice.jsx";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState(null);
  const socket = useRef();
  const [path, setPath] = useState("");
  const getPathName = (pathName) => {
    setPath(pathName);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      console.log("decodedToken", decodedToken);
      dispatch(fetchCurrency());
      dispatch(getApartments({ page: 1 }));
      dispatch(fetchUser(decodedToken._id));
      if (decodedToken.isAdmin) {
        console.log("admin is work??");
        dispatch(fetchUsers());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (user._id !== "") {
      socket.current = io("http://localhost:3030/");
      socket.current.emit("addUser", user._id);
    }
  }, [user._id]);

  useEffect(() => {
    const getNotifications = async () => {
      const { data } = await Roomster.get(
        `notifications/${"647bc39f25b8e3a36759d3b6"}`
      );
      setNotifications(data);
    };
    getNotifications();
  }, []);
  return (
    <BrowserRouter>
      {!path.includes("/dashboard") && (
        <Navbar socket={socket} notifications={notifications} />
      )}
      <Container maxWidth="xl" sx={{ minHeight: "80vh" }}>
        <Routers getPathName={getPathName} />
      </Container>
      {!path.includes("/dashboard") && <Footer />}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;