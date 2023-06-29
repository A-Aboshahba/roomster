import { useState } from "react";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import { Grid } from "@mui/material";
import CardReview from "./CardReview";
import MoreReview from "./MoreReview";
import { useSelector } from "react-redux";
import {
  getApartmentReviwsState,
  getApartmentTotalReviwsState,
} from "../../store/Slices/apartment";
import { useEffect } from "react";
import AddReview from "./addReview";
import { Box } from "@mui/system";

function ReviewSection() {
  const apartmentReviews = useSelector(getApartmentReviwsState);
  const apartmentReviewsAverage = useSelector(getApartmentTotalReviwsState);

  // useEffect(()=>{

  // },[])
  const [hasReview] = useState(true);
  return (
    <>
      {hasReview && (
        <>
          <Typography variant="h5" color="initial" sx={{ my: 4 }}>
            Rating ({apartmentReviews.length}){" "}
            {apartmentReviewsAverage === "NaN" ? "" : apartmentReviewsAverage}
            <StarIcon sx={{ color: "#f2fe05" }} />
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CardReview item={apartmentReviews[0]} />

              <CardReview item={apartmentReviews[1]} />

              <CardReview item={apartmentReviews[2]} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardReview item={apartmentReviews[3]} />

              <CardReview item={apartmentReviews[4]} />

              <CardReview item={apartmentReviews[5]} />
            </Grid>
          </Grid>
          <MoreReview />
          <Box component="span" sx={{ margin: "0 1rem" }}></Box>
          <AddReview />
        </>
      )}
    </>
  );
}

export default ReviewSection;
