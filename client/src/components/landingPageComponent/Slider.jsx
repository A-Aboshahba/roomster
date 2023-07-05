import { Container } from "@mui/system";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { AiFillStar, AiFillHeart, AiTwotoneDelete } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import {
  flexBetween,
  dFlex,
  carouselDot,
  fixedIcon,
  carouselImage,
  fixedBottom,
} from "../../theme/commonStyles.jsx";
import "../Card/CarouselCard.css";
import { Link } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";

const Slider = ({ apartments }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1200, min: 900 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 900, min: 700 },
      items: 3,
    },
    small: {
      breakpoint: { max: 700, min: 450 },
      items: 2,
    },
    verysmall: {
      breakpoint: { max: 450, min: 0 },
      items: 1,
    },
  };
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1); // jumps when we click the next arrow
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1); // when we click the back arrow
  };

  const handleStepChange = (step) => {
    setActiveStep(step); // handle swipe change
  };
  const maxSteps = apartments.images?.length;

  return (
    <Container sx={{ mt: "3rem" }}>
      <Typography variant="h5" color="initial">
        Best Seller
      </Typography>
      <Carousel
        responsive={responsive}
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
      >
        {apartments &&
          apartments.map(
            (card) =>
              card.avgRating > 3 && (
                <Box
                  className="carouselCard"
                  sx={{
                    flexGrow: 1,
                    position: "relative",
                    padding: "5px",
                  }}
                >
                  <Box>
                    <img
                      src={card.images[0].url}
                      style={{
                        width: "100%",
                        height: "100%",
                        aspectRatio: "1/1",
                        borderRadius: "10px",
                      }}
                      alt=""
                    />
                  </Box>

                  <Link to={`/housingDetails/${card._id}`} className="Link">
                    <Box sx={flexBetween}>
                      <Box sx={{ mt: 2 }}>
                        <Typography component="h3"> {card.title}</Typography>

                        {/* <Typography component="h4"> {card.days}</Typography> */}

                        <Typography component="h5"> {card.price}</Typography>
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Box sx={dFlex}>
                          {card.avgRating ? (
                            <>
                              {card.avgRating?.toFixed(1)}{" "}
                              <AiFillStar size={18} color="#FFC95F" />
                            </>
                          ) : (
                            <>
                              <AiFillStar size={18} />
                            </>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Link>
                </Box>
              )
          )}
      </Carousel>
    </Container>
  );
};

export default Slider;
