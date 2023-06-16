import { useState } from "react";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import { Grid } from "@mui/material";
import CardReview from "./CardReview";
import MoreReview from "./MoreReview";
function ReviewSection() {
  const [hasReview] = useState(true);
  return (
    <>
      {hasReview && (
        <>
          <Typography variant="h5" color="initial" sx={{ my: 4 }}>
            Rating (51) 4.99 <StarIcon sx={{ color: "#c59f06" }} />
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {/*//! here we add all review */}
              <CardReview />
              <CardReview />
              <CardReview />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardReview />
              <CardReview />
              <CardReview />
            </Grid>
          </Grid>
          <MoreReview />
        </>
      )}
    </>
  );
}

export default ReviewSection;
