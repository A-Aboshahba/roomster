import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CarouselCard from "./CarouselCard";
import { useState } from "react";

const LocationCards = ({ cards }) => {
  console.log("cards,", cards);
  if (!cards.length) {
    return null;
  }
  return (
    <Box sx={{ mx: 2 }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        {cards.map((location, index) => {
          return (
            <Grid key={location._id} item xs={12} sm={4} md={4} lg={3}>
              <CarouselCard location={location} index={index} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default LocationCards;
