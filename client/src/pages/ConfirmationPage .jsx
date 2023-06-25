import { motion } from "framer-motion";
import {
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  styled,
} from "@mui/material";
import image from '../assets/Success-PNG-Image.png'

const ConfirmationPage  = () => {
  
    const StyledPaper = styled(Paper)(({ theme }) => ({
      padding: theme.spacing(4),
    }));
    
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <StyledPaper>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <Typography variant="h4" align="center">
                    Payment Successful!
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" align="center">
                    Thank you for your purchase.
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <img
                    src={image}
                    alt="Payment Success"
                    style={{ maxWidth: "100%", maxHeight: "20vh" }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Button href="home"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 4 }}
                  >
                    Back To Home Page
                  </Button>
                </Grid>
              </Grid>
            </StyledPaper>
          </Container>
        </motion.div>
      );
    };


export default ConfirmationPage ;