import { Grid } from "@mui/material"
import FilterAndSearch from "../../components/homeComponents/FilterAndSearch"
import LocationCards from "../../components/Card/LocationCard"
import "./homeStyle.css"


function Homepage() {
    return (
    <>
            <FilterAndSearch />
            <Grid container columnSpacing={2} rowSpacing={4} >
                {[...'x'.repeat(1)].map((value, index) => {
                    return  <LocationCards key={index} />
                })}
            </Grid>
    </>
    )
}

export default Homepage