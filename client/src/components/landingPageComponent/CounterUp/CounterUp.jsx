import { Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import PersonIcon from "@mui/icons-material/Person";
import CottageIcon from "@mui/icons-material/Cottage";
const CounterCard = ({ end }) => {
  return (
    <CountUp
      enableScrollSpy={true}
      scrollSpyOnce={true}
      start={0}
      end={end}
      duration={10}
      delay={0.5}
      style={{
        color: "#9b9183",
        fontSize: "90px",
        textAlign: "center",
      }}
    />
  );
};

function CounterUp() {
  return (
    <Grid
      container
      spacing={2}
      className="justify-content-center align-items-center"
      sx={{
        background: "#EFEBE1",
        width: "100vw",
        height: "250px",
      }}
    >
      <Grid item xs={12} sm={6} md={2} className="p-4 text-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <PersonIcon
            sx={{
              color: "#9b9183",
              fontSize: "90px",
              textAlign: "center",
            }}
          />
          <CounterCard end={150} />
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={2} className="p-4 text-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <CottageIcon
            sx={{
              color: "#9b9183",
              fontSize: "90px",
              textAlign: "center",
            }}
          />
          <CounterCard end={250} />
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={2} className="p-4 text-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <CottageIcon
            sx={{
              color: "#9b9183",
              fontSize: "90px",
              textAlign: "center",
            }}
          />
          <CounterCard end={140} />
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={2} className="p-4 text-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <CottageIcon
            sx={{
              color: "#9b9183",
              fontSize: "90px",
              textAlign: "center",
            }}
          />
          <CounterCard end={100} />
        </div>
      </Grid>
    </Grid>
  );
}
export default CounterUp;
