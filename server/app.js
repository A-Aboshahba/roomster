require("./models/userModel");
require("./models/apartmentModel");
require("./models/reviewModel");
require("./models/reservationModel");
const express = require("express");
const cors = require("cors");
// const multer = require("multer");
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const apartmentRouter = require("./routes/apartmentRoute");
const reviewRouter = require("./routes/reviewRoute");
const server = express();
//############################################################################

// Enable CORS and allow PATCH method for any origin
// let port = process.env.PORT || 3030;
let port = process.env.PORT || 8080;


const stripe = require("stripe")('sk_test_51NMW2JI6wftnZOEC7f8A1xWw4rHpEytoW0qtwVwp1wDaHuQHsDbcdvpnK0p81sifmSN3IXP5XawFtEGDR7S29HEP005vv3bAXr');
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
    return 1200;
};

//############################################################################
server.use(express.json());
server.use(morgan("common"));

server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
//############################################################################
server.use(express.json());
server.use(morgan("common"));

server.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//####__server_and_db_initialization__########################################
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connected ");
    server.listen(port, () => {
      console.log(`server is listening at port: ${port}`);
    });
  })
  .catch((error) => console.log(error));

//#####################################################__routes__##########################################################
server.use("/auth", authRoute);
server.use("/user", userRoute);
server.use("/apartments", apartmentRouter);
server.use("/reviews", reviewRouter);

//######################### Create a PaymentIntent with the order amount and currency######################################
server.post("/create-payment-intent", async (req, res) => {
// Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "aed",
    automatic_payment_methods: {
    enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

//#######################################################################
server.use((request, response, next) => {
  response.status(404).json({ message: "Page Not Found..!" });
});
server.use((error, request, response, next) => {
  // console.log(error);
  response.status(error.status || 505).json({ message: error + "" });
});
