import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Checkbox, FormControlLabel } from "@mui/material";
import Roomster from "../../API/config";
import { useSelector } from "react-redux";
import ChangePassword from "../../components/profileComponent/ChangePassword";

export default function EditProfile() {
  const [showPassword, setShowPassword] = React.useState(false);

  const user = useSelector((state) => state.user.user);

  async function EditData(values) {
    await Roomster.patch(`user/${user._id}`, values);
    window.location.reload();
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: `${user.firstName}`,
      lastName: `${user.lastName}`,
      email: `${user.email}`,
      password: `${user.password}`,
      address: {
        country: `${user.address?.country}`,
        city: `${user.address?.city}`,
      },
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      EditData(values);
    },
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2ch",
      }}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="h4" sx={{ m: 1 }}>
        Edit Profile
      </Typography>
      <div>
        <TextField
          name="firstName"
          required
          fullWidth
          id="outlined-controlled"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          sx={{
            m: "1%",
            width: "48%",
            my: 1,
          }}
        />
        <TextField
          label="Last Name"
          id="outlined-controlled"
          required
          fullWidth
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          sx={{
            m: "1%",
            width: "48%",
            my: 1,
          }}
        />

        <FormControl
          sx={{
            m: "1%",
            width: "48%",
            my: 1,
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-controlled">Country</InputLabel>
          <OutlinedInput
            id="outlined-controlled"
            required
            fullWidth
            label="Country"
            name="address.country"
            value={formik.values.address?.country || ""}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl
          sx={{
            m: "1%",
            width: "48%",
            my: 1,
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-controlled">City</InputLabel>
          <OutlinedInput
            id="outlined-controlled"
            required
            fullWidth
            label="City"
            name="address.city"
            autoComplete="city"
            value={formik.values.address?.city || ""}
            onChange={formik.handleChange}
          />
        </FormControl>

        <Button type="submit" variant="contained" sx={{ m: 1, color: "white" }}>
          Save Changes
        </Button>

        <ChangePassword />
      </div>
    </Box>
  );
}
