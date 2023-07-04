import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Roomster from "../../API/config";
import { useSelector } from "react-redux";
import { toastMessage } from "../../utils/toasfiy";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const ChangePassword = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(false);
  const { user } = useSelector((state) => state.user);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = async () => {
    try {
      const res = await Roomster.patch(`user/${user._id}/password`, {
        password,
      });
      handleClose();
      toastMessage("success", res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button variant="outlined" color="blue" onClick={handleOpen}>
        Change Password
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h4"
            component="h2"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Change Your Password
          </Typography>
          <FormControl
            sx={{
              m: "1%",
              width: "98%",
              my: 1,
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-controlled">Password</InputLabel>
            <OutlinedInput
              id="outlined-controlled"
              label="Password"
              required
              fullWidth
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Box
            sx={{
              mt: "2rem",
              textAlign: "center",
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => handleChangePassword()}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ChangePassword;
