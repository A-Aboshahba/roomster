import React from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// this package for dealing with dates
import moment from "moment";

// mui icons
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// 3rd party
import SwipeableViews from "react-swipeable-views";
// react icons
import { AiFillStar } from "react-icons/ai";

import {
  flexBetween,
  carouselDot,
  carouselImage,
  fixedBottom,
} from "../../theme/commonStyles.jsx";
import "./CarouselCard.css";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const MyTripsCard = ({ reservation }) => {
  console.log(reservation);

  const [activeStep, setActiveStep] = React.useState(0);

  const maxSteps = reservation.apartmentId.images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1); // jumps when we click the next arrow
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1); // when we click the back arrow
  };

  const handleStepChange = (step) => {
    setActiveStep(step); // handle swipe change
  };

  return (
    <Box
      className="carouselCard"
      sx={{
        flexGrow: 1,
        position: "relative",
      }}
    >
      {reservation.apartmentId.images && (
        <SwipeableViews
          axis={"x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {reservation.apartmentId.images.map((step) => {
            return (
              <div key={step.publicId}>
                <Box
                  component="img"
                  sx={carouselImage}
                  src={step.url}
                  alt={step.publicId}
                ></Box>
              </div>
            );
          })}
        </SwipeableViews>
      )}

      <Box sx={fixedBottom}>
        <MobileStepper
          sx={{ backgroundColor: "transparent" }}
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              sx={carouselDot}
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              sx={carouselDot}
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
            </Button>
          }
        />
      </Box>

      <Link
        to={`/housingDetails/${reservation.apartmentId._id}`}
        className="Link"
      >
        <Box sx={flexBetween}>
          <Box sx={{ mt: 2, overflow: "hidden", textOverflow: "ellipsis" }}>
            <Typography
              component="h3"
              sx={{
                fontWeight: "bold",
                fontSize: "0.9rem",
                color: "#333",
                marginBottom: "2px",
              }}
            >
              {reservation.apartmentId.title}
            </Typography>

            <Typography
              component="h5"
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: "#4CAF50",
              }}
            >
              <span> $</span>
              {`${reservation.totalPrice}`}
            </Typography>
          </Box>
        </Box>
        <Box sx={flexBetween}>
          <Box sx={{ mt: 2 }}>
            <Typography
              sx={{
                bgcolor: "#8bc34a",
                color: "white",
                borderRadius: "5px",
                width: 100,
                height: 20,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",

                fontSize: "0.7rem",
                boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.25)",
              }}
            >
              {`${moment(reservation.startDate).format("DD MMM YYYY")}`}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography
              sx={{
                bgcolor: "#1E90FF",
                color: "white",
                borderRadius: "5px",
                width: 100,
                height: 20,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",

                fontSize: "0.7rem",
                boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.25)",
              }}
            >
              {`${moment(reservation.endDate).format("DD MMM YYYY")}`}
            </Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};
MyTripsCard.propTypes = {
  reservation: PropTypes.any,
};

export default MyTripsCard;
