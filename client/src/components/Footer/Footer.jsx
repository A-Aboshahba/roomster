import { Container, Grid, Typography,  } from "@material-ui/core";

function Footer() {


  return (
    <div style={{ backgroundColor: "#232f3e", color: "white", padding: "16px" }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Get to Know Us</Typography>
            <Typography variant="body2">About Us</Typography>
            <Typography variant="body2">Careers</Typography>
            <Typography variant="body2">Press Center</Typography>
            <Typography variant="body2">Investor Relations</Typography>
            <Typography variant="body2">Roomster Devices</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Make Money with Us</Typography>
            <Typography variant="body2">Sell on Roomster</Typography>
            <Typography variant="body2">Sell Under Roomster Accelerator</Typography>
            <Typography variant="body2">Become a Host</Typography>
            <Typography variant="body2">Advertise Your Products</Typography>
            <Typography variant="body2">Self-Publish with Us</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Let Us Help You</Typography>
            <Typography variant="body2">COVID-19 and Roomster</Typography>
            <Typography variant="body2">Your Account</Typography>
            <Typography variant="body2">Your Reversation</Typography>
            <Typography variant="body2">Shipping Rates & Policies</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              &copy; 2023 My Company. All rights reserved.
            </Typography>
          </Grid>
         
          </Grid>
      </Container>
    </div>
  );
}

export default Footer;