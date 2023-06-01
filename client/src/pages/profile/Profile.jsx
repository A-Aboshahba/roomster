import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EditProfile from "./EditProfile.jsx"
import Grid from '@mui/material/Grid';

const Profile = () => {
    return (
        <Grid container sx={{ my: 3 }} >
            <Grid item lg={3} xl={3} sm={4} md={3} sx={{ margin: '16px auto' }} >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                    <Box
                        component="img"
                        sx={{
                            border: '1px solid black',
                            borderRadius: "50%",
                            height: { lg: 200, md: 150, sm: 100, xs: 100 },
                            width: { lg: 200, md: 150, sm: 100, xs: 100 },
                            // maxHeight: { xs: 233, md: 150, sm: 100, xs: 100 },
                            // maxWidth: { xs: 350, md: 250, sm: 100, xs: 100 },
                        }}
                        alt="Profile picture."
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    />
                    <Typography variant='h6'> Khaled ElGamely</Typography>
                </Box>
            </Grid>
            <Divider color="#000" light='true' orientation="vertical" flexItem sx={{ mx: 6, display: { xs: "none", md: "block" } }} />
            <Grid item lg={7} xl={7} sm={8} md={7}>
                <EditProfile />
            </Grid>
        </Grid>
    )
}

export default Profile

// <EditProfile item lg={6} xl={6} />


// height: {lg:300, md:100, sm: 100, xs: 100},
//                                 width: {lg:200, md:150, sm: 100, sm: 100, xs: 100},
//                                 maxHeight: { xs: 233, md: 150, sm: 100, xs: 100 },
//                                 maxWidth: { xs: 350, md: 250, sm: 100, xs: 100 },
// sx={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}



// sx={{my: 3, display:{xs: 'flex', md: "block"}, flexDirection:{xs: "column"}, justifyContent:{xs:"center"}}}