import { Container } from "@mui/material";
import Navbar from "./components/navbar.jsx";
import "./App.css"
import Routers from "./Routes/Routers.jsx";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserInfo } from "./store/Slices/user.jsx";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
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
