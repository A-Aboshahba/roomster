import { Divider } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

import React from "react";

function ReviewCard({ review }) {
  return (
    <div className=" p-4 shadow rounded-2 mx-3 my-2 col-11 col-md-5 col-lg-3  ">
      <p style={{ width: "98%" }} className="mb-3">
        {review.description}
      </p>
      <Divider></Divider>
      <CardHeader
        avatar={
          <Avatar
            alt="Remy Sharp"
            src={review.image}
            // " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4wVGjMQ37PaO4PdUVEAliSLi8-c2gJ1zvQ&usqp=CAU"
            sx={{ width: 60, height: 60 }}
          />
        }
        title={review.name}
        subheader={"Review from TripAdvisor"}
        subheaderTypographyProps={{ style: { fontSize: "15px" } }}
      />
    </div>
  );
}

export default ReviewCard;
