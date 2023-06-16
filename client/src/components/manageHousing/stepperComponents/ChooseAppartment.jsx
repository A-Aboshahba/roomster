import { Box, Grid } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import Typography from '@mui/material/Typography';
import CabinIcon from '@mui/icons-material/Cabin';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import SailingIcon from '@mui/icons-material/Sailing';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import CameraOutdoorOutlinedIcon from '@mui/icons-material/CameraOutdoorOutlined';
import GiteOutlinedIcon from '@mui/icons-material/GiteOutlined';
import NightShelterOutlinedIcon from '@mui/icons-material/NightShelterOutlined';
import { styled } from '@mui/system';




let apartments = [
    {
        key:1,
        icon: <HomeIcon />,
        title: "Home"
    },
    {
        key:2,
        icon: <MapsHomeWorkIcon />,
        title: "home in farm"
    },
    {
        key:3,
        icon: <CabinIcon />,
        title: "boat"
    },
    {
        key:4,
        icon: <HouseSidingIcon />,
        title: "hut"
    },
    {
        key:5,
        icon: <SailingIcon />,
        title: "castle"
    },
    {
        key:5,
        icon: <EventSeatIcon />,
        title: "Bed and breakfast"
    },
    {
        key:6,
        icon: <CameraOutdoorOutlinedIcon />,
        title: "camper van"
    },
    {
        key:7,
        icon: <GiteOutlinedIcon />,
        title: "Cycladic house"
    },
    {
        key:8,
        icon: <NightShelterOutlinedIcon />,
        title: "Shipping container"
    },
]


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



function ChooseAppartment() {


    return (
        <Grid container>
            {apartments.map((apart, i) => (
                <CustomBox item key={i}>

                    <Box sx={{ fontSize: 3 }} >{apart.icon}</Box>
                    <Typography sx={{ textAlign: "center" }}>{apart.title}</Typography>

                </CustomBox>
            ))}
        </Grid>
    )
}

export default ChooseAppartment;


