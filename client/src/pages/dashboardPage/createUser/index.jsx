import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../components/dashboardComponent/Header";
import Roomster from "../../../API/config";
import { useState } from "react";

const CreateUser = () => {
  const handleFormSubmit = async (values) => {
    try {
      await Roomster.post("auth/signup", values);
      resetFormValues();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    fullName: yup.string().required("Required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup
      .string()
      .required("Required")
      .min(6, "Must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    address: yup.object().shape({
      country: yup.string().required("Required"),
      city: yup.string().required("Required"),
    }),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: {
      country: "",
      city: "",
    },
    // isAdmin: false,
  };
  const resetFormValues = () => {
    setFormValues(initialValues);
  };

  const [formValues, setFormValues] = useState(initialValues);

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={formValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Full Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullName}
                  name="fullName"
                  error={!!touched.fullName && !!errors.fullName}
                  helperText={touched.fullName && errors.fullName}
                  sx={{ gridColumn: "span 4" }}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Country"
                  name="address.country"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address.country}
                  error={
                    !!touched.address?.country && !!errors.address?.country
                  }
                  helperText={
                    touched.address?.country && errors.address?.country
                  }
                  sx={{ gridColumn: "span 4" }}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="City"
                  name="address.city"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address.city}
                  error={!!touched.address?.city && !!errors.address?.city}
                  helperText={touched.address?.city && errors.address?.city}
                  sx={{ gridColumn: "span 4" }}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Confrim Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  error={!!touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{ gridColumn: "span 4" }}
                />
              </Grid>
              {/* <Grid item sm={12}>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="user-role-select">User Role</InputLabel>
                  <Select
                    labelId="user-role-select"
                    id="user-role-select"
                    value={values.isAdmin}
                    name="isAdmin"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}
            </Grid>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                sx={{ mb: 2 }}
                type="submit"
                color="secondary"
                variant="contained"
              >
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateUser;
