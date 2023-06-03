require("./models/userModel");
require("./models/apartmentModel");
require("./models/reviewModel");
const express = require("express");
// const multer = require("multer");
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const apartmentRouter = require("./routes/apartmentRoute");
//############################################################################
const server = express();
let port = process.env.PORT || 8080;
//############################################################################
server.use(express.json());
server.use(morgan("common"));

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

//###__routes__##########################################################
server.use("/auth", authRoute);
server.use("/user", userRoute);
server.use("/apartments", apartmentRouter);
//#######################################################################
server.use((request, response, next) => {
  response.status(404).json({ message: "Page Not Found..!" });
});
server.use((error, request, response, next) => {
  // console.log(error);
  response.status(error.status || 505).json({ message: error + "" });
});
