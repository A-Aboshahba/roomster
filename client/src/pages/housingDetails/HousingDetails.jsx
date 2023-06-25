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
import { addFavorite, deleteFavorite } from "../../store/Slices/userSlice";
import { createAllIcons } from "../../utils/createIcons";
import Roomster from "../../API/config";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51NMW2JI6wftnZOECQ1OU2KtcGuY0JcqT6zPFJCaXmE9b9vEmjGZwyjWHq9M444W41gsB1QYqP8FdReg1zyA8YT6p00kryLDqqp");
// eslint-disable-next-line react/prop-types
const Modal = ({ onClose, children }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        {children}
        <Button
          variant="contained"
          color="error"
          style={{ marginTop: "10px" }}
          onClick={onClose}
        >
          cancel
        </Button>
      </div>
    </div>
  );
};
export default function HousingDetails() {
  const params = useParams();
  console.log(params.apartmentId);
  const dispatch = useDispatch();
  const singleApartment = useSelector(getSingleApartmentState);
  let counter = 0;
  const user = useSelector((state) => {
    return state.user?.user;
  });
  const allIcons = createAllIcons(singleApartment.apartmentSpecification);
  const [isFavorite, setIsFavorite] = useState(
    user.favourites?.find((favorite) => {
      return favorite._id == params.apartmentId;
    })
  );
  useEffect(() => {
    dispatch(getSingleApartment({ id: params.apartmentId }));
    dispatch(getApartmentReviews({ apartmentId: params.apartmentId }));
  }, [dispatch, isFavorite]);

  const Like = () => {
    dispatch(
      addFavorite({
        userId: user._id,
        location: singleApartment,
      })
    );
    setIsFavorite((prev) => !prev);
  };
  const disLike = () => {
    dispatch(
      deleteFavorite({
        userId: user._id,
        location: singleApartment,
      })
    );
    setIsFavorite((prev) => !prev);
  };
    
  const [clientSecret, setClientSecret] = useState(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    Roomster.post("create-payment-intent", {
      items: [{ price: "456456" }],
      })
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      })  
  }, []);

  const handleReserveClick = () => {
    setShowCheckoutForm(true);
  };
  const handleModalClose = () => {
    setShowCheckoutForm(false);
  };
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

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
          <Box style={{ cursor: "pointer" }}>
            {isFavorite ? (
              <AiFillHeart
                size={30}
                color="#fff"
                fill="#b12929"
                onClick={() => {
                  disLike();
                }}
              />
            ) : (
              <FaRegHeart size={30} color="#000" onClick={() => Like()} />
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
              alt={singleApartment?.userId?.fullName}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4wVGjMQ37PaO4PdUVEAliSLi8-c2gJ1zvQ&usqp=CAU"
            />
            <Box>
              <Typography variant="h4" color="initial">
                Entire villa hosted by {singleApartment?.userId?.fullName}
              </Typography>
              <Typography variant="p" color="initial">
                Balcony ({singleApartment.apartmentSpecification?.noOfBalcony})-
                Beds ({singleApartment.apartmentSpecification?.noOfBeds})-
                Kitchens ({singleApartment.apartmentSpecification?.noOfKitchens}
                ) - Rooms ({singleApartment.apartmentSpecification?.noOfRooms})
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
            <Grid container spacing={2} sx={{ paddingLeft: "18px" }}>
              {allIcons[0] != undefined &&
                allIcons.map(
                  (item) =>
                    item.isFound &&
                    counter < 6 && (
                      <Grid item key={item.key} xs={12} sm={6}>
                        <span style={{ display: "none" }}>{counter++}</span>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 3,
                          }}
                        >
                          {item.icon}
                          <Typography variant="body1" color="initial">
                            {item.title}
                          </Typography>
                        </Box>
                      </Grid>
                    )
                )}
            </Grid>
            <MoreOffer allIcons={allIcons} />
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
        
            <Button
        variant="contained"
        color="success"
        sx={{ width: "280px" }}
        onClick={handleReserveClick}
      >
        reserve
      </Button>
          </Box>
        </Grid>
      </Grid>
      {showCheckoutForm && clientSecret && (
        <Modal onClose={handleModalClose}>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </Modal>
      )}
    </>
  );
}