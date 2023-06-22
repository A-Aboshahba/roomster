import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "../index.css";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import Brightness6OutlinedIcon from "@mui/icons-material/Brightness6Outlined";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ResetRedux } from "../store/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
const drawerWidth = 240;
const navItems = ["Home", "Message", "My Trips", "Manage Housing"];
import image from '../assets/41KUZDZwSeL.png'

function Navbar(props) {



  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorLanguage, setAnchorLanguage] = useState(null);
  const openLanguage = Boolean(anchorLanguage);
  const navigate = useNavigate();
  const dataUser = useSelector((state) => state.user.user)
  const open = Boolean(anchorEl);

  const dispatch = useDispatch()
  console.log(dataUser)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseLanguage = () => {
    setAnchorLanguage(null);
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const profileComponent = (
    <>
      <Box  sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="large"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {dataUser !== null ? <Link to="profile">
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
          <Divider />
        </Link> : ''}
        {dataUser !== null ? <Link to="wishlist">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ShoppingCartIcon fontSize="small" />
            </ListItemIcon>
            wishlist
          </MenuItem>
        </Link> : ''}
        {dataUser !== null ?
          <MenuItem onClick={() => { handleClose(); localStorage.clear(); dispatch(ResetRedux()); navigate('/home') }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
          : ''}
        {dataUser === null ?
          <MenuItem component={Link} to={'/register'} onClick={() => { handleClose() }}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            Sign up
          </MenuItem>
          : ''}
        {dataUser === null ?
          <MenuItem component={Link} to={'/login'} onClick={() => { handleClose() }}>
            <ListItemIcon>
              <LoginIcon fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
          : ''}
        {dataUser === null ?
          <MenuItem component={Link} to={'/help'} onClick={() => { handleClose() }}>
            <Divider />
            <ListItemIcon>
              <HelpOutlineOutlinedIcon fontSize="small" />
            </ListItemIcon>
            help
          </MenuItem>
          : ''}



      </Menu>    </>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
      <img
          src={image}
          className="logo"
        />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link to={item} key={item}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => console.log("first")}
                sx={{ textAlign: "center" }}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        <Divider />
        {dataUser !== null ?
          <ListItem disablePadding component={Link} to={'/profile'}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem> : ''}
        {dataUser !== null ?
          <ListItem disablePadding component={Link} to={'/wishlist'}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="wishlist" />
            </ListItemButton>
          </ListItem>
          : ''}
        <Divider />
        {dataUser !== null ?
          <ListItem disablePadding onClick={() => { localStorage.clear(); dispatch(ResetRedux()) }}>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="LogOut" />
          </ListItemButton>
        </ListItem>:''}
        {dataUser === null ?
          <ListItem disablePadding component={Link} to={'/register'} >
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Sign up" />
          </ListItemButton>
        </ListItem>:''}
        {dataUser === null ?
          <ListItem disablePadding component={Link} to={'/login'} >
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Login in" />
          </ListItemButton>
        </ListItem>:''}
        {dataUser === null ?
          <ListItem disablePadding component={Link} to={'/help'} >
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Help" />
          </ListItemButton>
        </ListItem>:''}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", mb: 10 }}>
      <AppBar component="nav" color="secondary" position="fixed">
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <img
              src={image}
              className="logo"
            />
          </Typography>

          <Box
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            className="center"
          >
            {navItems.map((item) => (
              <Link to={item} key={item}>
                <Button component="div" size="large" sx={{ color: "#000" }}>
                  {item}
                </Button>
              </Link>
            ))}

            {/* icon dark mode  */}
            <ModeNightIcon
              size="large"
              sx={{ mx: 1, ml: 8, cursor: "pointer" }}
            />
            {/* icon Brightness mode  */}
            <Brightness6OutlinedIcon
              size="large"
              sx={{ mx: 1, ml: 8, cursor: "pointer", display: "none" }}
            />

            {/* icon language start */}
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >

              </Box>
              <Menu
                anchorEl={anchorLanguage}
                id="language-menu"
                open={openLanguage}
                onClose={handleCloseLanguage}
                onClick={handleCloseLanguage}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>English</MenuItem>
                <MenuItem onClick={handleClose}>Arabic</MenuItem>
              </Menu>
            </>
            {/* icon language end */}

            {/* icon profile start */}
            {profileComponent}
            {/* icon profile end */}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
