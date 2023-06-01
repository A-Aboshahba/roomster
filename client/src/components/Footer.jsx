import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { makeStyles } from '@mui/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
const useStyles = makeStyles({
    root: {
        backgroundColor: '#f5f5f5',
        padding: '1rem',
        marginTop: '2rem',
    },
    icon: {
        marginRight: '0.5rem',
        transform:'translateY(5px)'
    },
});

function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.root}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            We are a company that specializes in providing high-quality products and services to our customers.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography  variant="body1" gutterBottom>
                            <EmailIcon className={classes.icon} />
                            Email: info@example.com
                        </Typography>
                        <Typography  variant="body1" gutterBottom>
                            <PhoneIcon className={classes.icon} />
                            Phone: +1 (123) 456-7890
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <FacebookIcon className={classes.icon} />
                            Facebook
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
}

export default Footer;