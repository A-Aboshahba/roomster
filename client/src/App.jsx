import { Container } from "@mui/material";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";
import Routers from "./Routes/Routers.jsx";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="xl">
        <Routers />
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
