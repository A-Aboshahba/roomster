import { Box } from '@mui/material'
import LivingIcon from '@mui/icons-material/Living';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import BedIcon from '@mui/icons-material/Bed';
import React from 'react'
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';



const CustomBox = styled(Box)({
  // Your default styles here
  border: '2px solid #ddd',
  cursor: 'pointer',
  marginTop: 25 ,
  marginBottom: 25 ,
  padding:18,
  borderRadius: 15,
  display: "flex",
  justifyContent: "space-between",
  p: 3,
  alignItems: "center",


  '&:hover': {
    borderColor: "#000",
  },
});



const HomeType = () => {
  return (
    <Box>
      <CustomBox>
        <Box sx={{ flex: 6 }}>
          <Typography sx={{ fontWeight: "bold" }}>Full Housing</Typography>
          <Typography>Guests get the place entirely to themselves</Typography>
        </Box>
        <LivingIcon fontSize="large" sx={{ flex: 1 }} />
      </CustomBox>

      <CustomBox>
        <Box sx={{ flex: 6 }}>
          <Typography sx={{ fontWeight: "bold" }}>Room</Typography>
          <Typography>Guests have their own room in the house as well as access to the common areas</Typography>
        </Box>
        <OtherHousesIcon fontSize="large" sx={{ flex: 1 }} />
      </CustomBox>

      <CustomBox>
        <Box sx={{ flex: 6 }}>
          <Typography sx={{ fontWeight: "bold" }}>Common Room</Typography>
          <Typography>Guests sleep in a room or common area that may be shared with you or others</Typography>
        </Box>
        <BedIcon fontSize="large" sx={{ flex: 1 }} />
      </CustomBox>

    </Box>
  )
}

export default HomeType