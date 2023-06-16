import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import IceSkatingIcon from '@mui/icons-material/IceSkating';
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



const TransferNow = () => {
  return (
      <Grid container >
        <CustomBox item>
          <IceSkatingIcon />
          <Typography>Calm</Typography>
        </CustomBox>
        <CustomBox item >
          <IceSkatingIcon />
          <Typography>special</Typography>
        </CustomBox>
        <CustomBox item >
          <IceSkatingIcon />
          <Typography>Appropriate to family</Typography>
        </CustomBox>
        <CustomBox item >
          <IceSkatingIcon />
          <Typography>elegant</Typography>
        </CustomBox>
        <CustomBox item >
          <IceSkatingIcon />
          <Typography>central</Typography>
        </CustomBox>
        <CustomBox item>
          <IceSkatingIcon />
          <Typography>wide</Typography>
        </CustomBox>
      </Grid>
  )
}

export default TransferNow