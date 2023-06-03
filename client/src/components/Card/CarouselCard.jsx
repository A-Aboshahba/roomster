import React from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// mui icons
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// 3rd party
import SwipeableViews from "react-swipeable-views";

// react icons
import { AiFillStar, AiFillHeart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import {
  flexBetween,
  dFlex,
  carouselDot,
  fixedIcon,
  carouselImage,
  fixedBottom,
} from "../../theme/commonStyles.jsx";
import "./CarouselCard.css";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

const CarouselCard = ({ location, index }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [icon, setIcon] = React.useState(false);
  const maxSteps = location.locationImages.length; // so that we know how many dots

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
      <Box
        sx={fixedIcon}
        style={{ cursor: "pointer" }}
        onClick={() => setIcon(!icon)}
      >
        {icon ? (
          <AiFillHeart size={24} color="#fff" fill="#b12929" />
        ) : (
          <FaRegHeart size={24} color="#fff" />
        )}
      </Box>

      {location.locationImages.length && (
        <SwipeableViews
          axis={"x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {location.locationImages.map((step) => {
            return (
              <div key={step.id}>
                <Box
                  component="img"
                  sx={carouselImage}
                  src={step.url}
                  alt={step.id}
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

      <Link to={`housingDetails/${index + 1}`} className="Link">
        <Box sx={flexBetween}>
          <Box sx={{ mt: 2 }}>
            <Typography component="h3"> {location.location}</Typography>
            <Typography component="h4"> {location.days}</Typography>
            <Typography component="h5"> {location.price}</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Box sx={dFlex}>
              {location.isNew ? (
                <React.Fragment>
                  <Typography component="h5">New</Typography>
                  <AiFillStar size={18} />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography component="h5"> {location.rating}</Typography>
                  <AiFillStar size={18} />
                </React.Fragment>
              )}
            </Box>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};
CarouselCard.propTypes = {
  location: PropTypes.any,
};

export default CarouselCard;
