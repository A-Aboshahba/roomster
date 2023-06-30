import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { green } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import store from "./store/store.jsx";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";

let theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: grey[50],
    },
    // mode: "dark",
  },
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
