import { useFormik } from 'formik';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Roomster from '../API/config';
import { useNavigate } from 'react-router';

function Signup() {
const navigate= useNavigate();
async function addUser(values){
const res =await  Roomster.post('auth/signup',values);
console.log(res.message);
}

const validationSchema = Yup.object().shape({
    firstName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
    lastName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
    fullName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required").min(6, "Must be at least 6 characters"),
    confirmPassword: Yup.string().required("Required").oneOf([Yup.ref("password"), null], "Passwords must match"),
    address: Yup.object().shape({
    country: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    }), });
const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
    addUser(values);
    navigate('/login')
    },});

    return (
        <ThemeProvider theme={createTheme()}>
            <Container component="main" maxWidth="xs" margin="10px" >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: {sm:8,lg:8},
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    name="fullName"
                                    autoComplete="name"
                                    value={formik.valuesfullName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address.country"
                                    label="Country"
                                    name="address.country"
                                    autoComplete="country"
                                    value={formik.values.address.country}
                                    onChange={formik.handleChange}
                                    error={formik.touched.address?.country && Boolean(formik.errors.address?.country)}
                                    helperText={formik.touched.address?.country && formik.errors.address?.country}/>
                            </Grid>
                            <Grid item xs={12}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="address.city"
                                    label="City"
                                    name="address.city"
                                    autoComplete="city"
                                    value={formik.values.address.city}
                                    onChange={formik.handleChange}
                                    error={formik.touched.address?.city && Boolean(formik.errors.address?.city)}
                                    helperText={formik.touched.address?.city && formik.errors.address?.city} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword} />
                            </Grid>
                           
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="./login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Signup;