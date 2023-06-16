import { Box, Grid } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SpaIcon from '@mui/icons-material/Spa';
import PoolIcon from '@mui/icons-material/Pool';
import StadiumIcon from '@mui/icons-material/Stadium';
import { styled } from '@mui/system';

const CustomBox = styled(Grid)({
  // Your default styles here
  width: "30%",
  height: 85,
  border: '2px solid #ddd',
  margin: "1%",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "12px",

  '&:hover': {
    borderColor: "#000",
  },
});




let apartments = [
  {
    key:1,
    icon: <WifiOutlinedIcon />,
    title: "Home"
  },
  {
    key:2,
    icon: <LiveTvIcon />,
    title: "home in farm"
  },
  {
    key:3,
    icon: <SoupKitchenIcon />,
    title: "boat"
  },
  {
    key:4,
    icon: <LocalLaundryServiceIcon />,
    title: "hut"
  },
  {
    key:5,
    icon: <DirectionsCarFilledIcon />,
    title: "castle"
  },
  {
    key:6,
    icon: <LocalParkingIcon />,
    title: "Bed and breakfast"
  },
  {
    key:7,
    icon: <AcUnitIcon />,
    title: "camper van"
  },
  {
    key:8,
    icon: <SpaIcon />,
    title: "Cycladic house"
  },
  {
    key:9,
    icon: <PoolIcon />,
    title: "Shipping container"
  },
  {
    key:10,
    icon: <StadiumIcon />,
    title: "Shipping container"
  },
]


const TellGuests = () => {
  return (
    <Box>
      <Typography>You can add more after publishing your ad</Typography>
      <Grid container sx={{ p: 2, display: "flex", flexWrap: "wrap" }}>
        {apartments.map((apart, i) => (
          <CustomBox item key={i}>
            <Box sx={{ fontSize: 3 }}>{apart.icon}</Box>
            <Typography sx={{ textAlign: "center" }}>{apart.title}</Typography>

          </CustomBox>
        ))}
      </Grid>
      <Typography>You can add more after publishing your ad</Typography>
      <Grid container sx={{ p: 2, display: "flex", flexWrap: "wrap" }}>
        {apartments.map((apart, i) => (
          <CustomBox item key={i}>
            <Box sx={{ fontSize: 3 }}>{apart.icon}</Box>
            <Typography sx={{ textAlign: "center" }}>{apart.title}</Typography>

          </CustomBox>
        ))}
      </Grid>
      <Typography>You can add more after publishing your ad</Typography>
      <Grid container sx={{ p: 2, display: "flex", flexWrap: "wrap" }}>
        {apartments.map((apart, i) => (
          <CustomBox item key={i}>
            <Box sx={{ fontSize: 3 }}>{apart.icon}</Box>
            <Typography sx={{ textAlign: "center" }}>{apart.title}</Typography>

          </CustomBox>
        ))}
      </Grid>
    </Box>
  )
}

export default TellGuests;
