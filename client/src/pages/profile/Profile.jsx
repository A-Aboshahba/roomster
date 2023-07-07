import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditProfile from "./EditProfile.jsx";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import "./style.css";
const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container sx={{ my: 3 }}>
        <Grid item lg={3} xl={3} sm={4} md={3} sx={{ margin: "16px auto" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
            }}
          >
            {user?.image?.url === "" ? (
              <Avatar sx={{ width: 150, height: 150 }}></Avatar>
            ) : (
              <Box
                component="img"
                sx={{
                  border: "1px solid black",
                  borderRadius: "50%",
                  height: { lg: 200, md: 150, sm: 100, xs: 100 },
                  width: { lg: 200, md: 150, sm: 100, xs: 100 },
                }}
                alt="img"
                src={user?.image?.url}
              />
            )}
          </Box>

          <Grid container spacing={2} mt={3}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <Typography variant="subtitle1">Full Name:</Typography>
              </Box>
              <Box sx={{ marginLeft: "8px" }}>
                <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <Typography variant="subtitle1">Address:</Typography>
              </Box>
              <Box sx={{ marginLeft: "8px" }}>
                <Typography>{`${user.address?.country} - ${user.address?.city}  `}</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <Typography variant="subtitle1">Email:</Typography>
              </Box>
              <Box sx={{ marginLeft: "8px", marginBottom: "30px" }}>
                <Typography>{user.email}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px !important" }}
            onClick={handleClickOpen}
          >
            Edit Profile
          </Button>
        </Grid>
        <Divider
          color="#000"
          orientation="vertical"
          flexItem
          sx={{ mx: 6, display: { xs: "none", md: "block" } }}
        />
        <Grid item lg={7} xl={7} sm={8} md={7}></Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <EditProfile setOpen={setOpen} />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            style={{ backgroundColor: "rgb(236 0 11)", color: "#ffff" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
