import Box from "@mui/material/Box";
import { Button, Divider, Grid, Typography } from "@mui/material";
import FullScreenDialog from "../../components/HousingComponent/MoreImages";
import { AiFillHeart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import HouseboatIcon from "@mui/icons-material/Houseboat";
import WifiIcon from "@mui/icons-material/Wifi";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import MoreOffer from "../../components/HousingComponent/MoreOffer";
import ReviewSection from "../../components/HousingComponent/ReviewSection";
import HousingInfo from "../../components/HousingComponent/HousingInfo";
import PickerDate from "../../components/HousingComponent/PickerData/PickerDate";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleApartment,
  getApartmentReviews,
  getSingleApartmentState,
  getApartmentReviwsState,
} from "../../store/Slices/apartment";

export default function HousingDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const [switchIcon, setSwitchIcon] = useState(false);
  const singleApartment = useSelector(getSingleApartmentState);
  console.count("called from here ???");

  console.log("hereeeee", singleApartment);
  useEffect(() => {
    dispatch(getSingleApartment({ id: params.apartmentId }));
    dispatch(getApartmentReviews({ apartmentId: params.apartmentId }));
  }, [dispatch]);
  console.log([singleApartment.apartmentSpecification]);
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          position: "relative",
          marginTop: "6rem",
        }}
      >
        <Box className="betweenItem" component="div" sx={{ mb: "1rem" }}>
          <Typography variant="h5" color="initial">
            {singleApartment.title}
          </Typography>
          <Box
            style={{ cursor: "pointer" }}
            onClick={() => setSwitchIcon(!switchIcon)}
          >
            {switchIcon ? (
              <AiFillHeart size={30} color="#fff" fill="#b12929" />
            ) : (
              <FaRegHeart size={30} color="#000" />
            )}
          </Box>
        </Box>
        <Grid
          container
          spacing={2}
          component="div"
          sx={{
            height: 500,
            overflow: "hidden",
          }}
        >
          <Grid item xs={12} md={6}>
            <img
              style={{
                width: "100%",
                height: "100%",
              }}
              src={singleApartment.images ? singleApartment.images[0].url : ""}
              alt=""
            />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: { xs: "none", md: "block" }, height: 500 }}
          >
            <Grid container spacing={2} component="div" sx={{ height: 500 }}>
              <Grid item xs={6}>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  src={
                    singleApartment.images ? singleApartment.images[1].url : ""
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  src={
                    singleApartment.images ? singleApartment.images[2].url : ""
                  }
                  alt=""
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  style={{
                    width: " 100%",
                    height: "100%",
                  }}
                  src={
                    singleApartment.images ? singleApartment.images[3].url : ""
                  }
                  alt=""
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  style={{
                    width: " 100%",
                    height: "100%",
                  }}
                  src={
                    singleApartment.images ? singleApartment.images[4].url : ""
                  }
                  alt=""
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* to display more image for housing */}
        <Box sx={{ position: "absolute", bottom: "20px", left: "10px" }}>
          <FullScreenDialog images={singleApartment.images} />
        </Box>
      </Box>
      <Grid
        container
        sx={{
          mt: 4,
          mb: 1,
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
        spacing={3}
      >
        <Grid item md={7}>
          <Box sx={{ mb: 1 }}>
            <Avatar
              sx={{ width: 70, height: 70 }}
              alt="Remy Sharp"
              src="https://a0.muscache.com/im/pictures/user/96db5a52-52db-42d4-a8bf-fe4d9cb7901d.jpg?im_w=240"
            />
            <Box>
              <Typography variant="h4" color="initial">
                Entire villa hosted by Mehmet Muhammet
              </Typography>
              <Typography variant="p" color="initial">
                8 guests4 bedrooms4 beds3 baths
              </Typography>
            </Box>
          </Box>
          <Divider />
          <HousingInfo title="Description" body={singleApartment.description} />
          <HousingInfo title="main rolls" body={singleApartment.rules} />
          <HousingInfo
            title="cancelation policy"
            body={singleApartment.cancelPolicy}
          />
          <Box sx={{ mt: 2, mb: 1 }}>
            <Typography variant="h4" color="initial" sx={{ mb: 4 }}>
              What this home has to offer
            </Typography>
            <Box sx={{ display: "flex", gap: "2rem" }}>
              <Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <HouseboatIcon fontSize="medium" />
                  <Typography variant="body1" color="initial">
                    Bay view
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <HouseboatIcon fontSize="medium" />
                  <Typography variant="body1" color="initial">
                    Beach access - beach front
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <WifiIcon fontSize="medium" />
                  <Typography variant="body1" color="initial">
                    Wifi
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <PersonalVideoIcon fontSize="medium" />
                  <Typography variant="body1" color="initial">
                    the television
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <DirectionsCarIcon fontSize="medium" />
                  <Typography variant="body1" color="initial">
                    Free parking in the buildings
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <AcUnitIcon fontSize="medium" />
                  <Typography variant="body1" color="initial">
                    air conditioner
                  </Typography>
                </Box>
              </Box>
            </Box>
            <MoreOffer />
          </Box>
          <Divider />
          <ReviewSection />
        </Grid>
        <Grid item md={5} sx={{ position: "sticky", top: 100 }}>
          <Box
            sx={{
              textAlign: "center",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              padding: "10px",
              width: "fit-content",
              margin: "auto",
            }}
          >
            <PickerDate reservationsArr={singleApartment.reservationsArr} price={singleApartment.price} />
        
            <Button variant="contained" color="success" sx={{ width: "280px" }}>
              reserve
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}