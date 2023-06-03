import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function HousingDetails() {
  return (
    <>
      <div className="images-container">
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default HousingDetails;
