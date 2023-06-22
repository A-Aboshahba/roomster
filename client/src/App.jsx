import { Container } from "@mui/material";
import Navbar from "./components/navbar.jsx";
import "./App.css";
import Routers from "./Routes/Routers.jsx";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/Slices/userSlice.jsx";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken._id;
      dispatch(fetchUser(userId));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="xl">
        <Routers />
      </Container>
    </BrowserRouter>
  );
}

export default App;
