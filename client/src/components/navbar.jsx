import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import '../index.css'
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ModeNightIcon from '@mui/icons-material/ModeNight';
import Brightness6OutlinedIcon from '@mui/icons-material/Brightness6Outlined';
const drawerWidth = 240;
const navItems = ['Home', 'Message', 'My Trips', 'Manage Housing'];



function Navbar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorLanguage, setAnchorLanguage] = React.useState(null);
    const openLanguage = Boolean(anchorLanguage);
    const handleClickLanguage = (event) => {
        setAnchorLanguage(event.currentTarget);
    };
    const handleCloseLanguage = () => {
        setAnchorLanguage(null);
    };

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const profileComponent = (
        <React.Fragment>
            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
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
                            mr: 1
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
                            zIndex: 0
                        }
                    }
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <ShoppingCartIcon fontSize="small" />
                    </ListItemIcon>
                    wishlist
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    )

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <img src='https://m.media-amazon.com/images/I/41KUZDZwSeL.png' className='logo' />
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText primary='Profile' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText primary='wishlist' />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText primary='settings' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText primary='LogOut' />
                    </ListItemButton>
                </ListItem>

            </List>

        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', mb: 10 }} >
            <AppBar component="nav" color='secondary' position='fixed'  >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <img src='https://m.media-amazon.com/images/I/41KUZDZwSeL.png' className='logo' />
                    </Typography>

                    <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} className='center' >
                        {navItems.map((item) => (
                            <Button component='div' key={item} size='large' sx={{ color: '#000' }}>
                                {item}
                            </Button>
                        ))}

                        {/* icon dark mode  */}
                        <ModeNightIcon size='large' sx={{ mx: 1, ml: 8, cursor: 'pointer' }} />
                        {/* icon Brightness mode  */}
                        <Brightness6OutlinedIcon size='large' sx={{ mx: 1, ml: 8, cursor: 'pointer', display: 'none' }} />

                        {/* icon language start */}
                        <React.Fragment>
                            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                                <Tooltip title="Language / اللغة">
                                    <IconButton
                                        onClick={handleClickLanguage}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={openLanguage ? "language-menu" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openLanguage ? "true" : undefined}
                                    >
                                        <LanguageRoundedIcon sx={{ width: 32, height: 32 }} />
                                    </IconButton>
                                </Tooltip>
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
                                            mr: 1
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
                                            zIndex: 0
                                        }
                                    }
                                }}
                                transformOrigin={{ horizontal: "right", vertical: "top" }}
                                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                            >
                                <MenuItem onClick={handleClose}>English</MenuItem>
                                <MenuItem onClick={handleClose}>Arabic</MenuItem>
                            </Menu>
                        </React.Fragment>
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
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
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
