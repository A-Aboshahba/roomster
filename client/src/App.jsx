import { Container } from "@mui/material";
import Navbar from "./components/navbar.jsx";
import "./App.css"
import Routers from "./Routes/Routers.jsx";
import { BrowserRouter } from "react-router-dom";
function App() {
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
