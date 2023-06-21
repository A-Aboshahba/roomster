import { Grid } from "@mui/material";
import FilterAndSearch from "../../components/homeComponents/FilterAndSearch";
import LocationCards from "../../components/Card/LocationCard";
// import { locations as cardLocations } from "../../data/allData.jsx";
import "./homeStyle.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getApartments,
  getApartmentsState,
} from "../../store/Slices/apartment";
import { useEffect } from "react";
function Homepage() {
  const dispatch = useDispatch();
  const apartments = useSelector(getApartmentsState);
  useEffect(() => {
    dispatch(getApartments({ page: 1 }));
    // console.log(apartments);
  }, []);
  return (
    <>
      <FilterAndSearch />
      <Grid container columnSpacing={2} rowSpacing={4}>
        <LocationCards cards={apartments} />;
      </Grid>
    </>
  );
}

export default Homepage;
