import { Grid } from "@mui/material";
import FilterAndSearch from "../../components/homeComponents/FilterAndSearch";
import LocationCards from "../../components/Card/LocationCard";
import { locations as cardLocations } from "../../data/allData.jsx";

import "./homeStyle.css";

function Homepage() {
  return (
    <>
      <FilterAndSearch />
      <Grid container columnSpacing={2} rowSpacing={4}>
        <LocationCards cards={cardLocations} />;
      </Grid>
    </>
  );
}

export default Homepage;
