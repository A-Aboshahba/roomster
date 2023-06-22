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
server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
let port = 8080;
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
    server.listen(8080, () => {
      console.log(`server is listening at port: 8080`);
    });
  })
  .catch((error) => console.log(error));

//###__routes__##########################################################
server.use("/auth", authRoute);
server.use("/user", userRoute);
server.use("/apartments", apartmentRouter);
server.use("/reviews", reviewRouter);
//#######################################################################
server.use((request, response, next) => {
  response.status(404).json({ message: "Page Not Found..!" });
});
server.use((error, request, response, next) => {
  // console.log(error);
  response.status(error.status || 505).json({ message: error + "" });
});
