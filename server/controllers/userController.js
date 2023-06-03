const mongoose = require("mongoose");
const User = mongoose.model("Users");
const ObjectId = require("mongoose").Types.ObjectId;

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

module.exports.getAllUsers = (request, response, next) => {
  User.find()
    .then((data) => {
      if (!data) {
        let error = new Error("there're no users to show");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

module.exports.getSingleUser = (request, response, next) => {
  User.findOne({ _id: request.params.id })
    .then((data) => {
      if (!data) {
        let error = new Error("there're no user to show");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

module.exports.updateSingleUser = (request, response, next) => {
  User.updateOne({ _id: request.params.id }, request.body)
    .then((data) => {
      if (data.matchedCount == 0) {
        let error = new Error("this user doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      console.log(data);
      response
        .status(200)
        .json({ data: "edit  Teacher successfully..!", data });
    })
    .catch((error) => next(error));
};

module.exports.deleteSingleUser = (request, response, next) => {
  User.deleteOne({ _id: request.params.id })
    .then((data) => {
      if (data.matchedCount == 0) {
        let error = new Error("this user doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json({ data: "deleted  User successfully..!" });
    })
    .catch((error) => next(error));
};
module.exports.getFavourites = (request, response, next) => {
  User.findOne({ _id: request.params.id }, { favourites: 1 })
    .then((data) => {
      if (!data) {
        let error = new Error("there're no user to show");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};
module.exports.addFavourite = (request, response, next) => {
  User.updateOne(
    { _id: request.params.id },
    { $addToSet: { favourites: request.body.apartmentId } }
  )
    .then((data) => {
      if (data.matchedCount == 0) {
        let error = new Error("this user doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response
        .status(200)
        .json({ data: "favourite Added successfully..!", data });
    })
    .catch((error) => next(error));
};
module.exports.removeFavourite = (request, response, next) => {
  User.updateOne(
    { _id: request.params.id },
    { $pull: { favourites: request.body.apartmentId } }
  )
    .then((data) => {
      if (data.matchedCount == 0) {
        let error = new Error("this user doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response
        .status(200)
        .json({ data: "favourite removed successfully..!", data });
    })
    .catch((error) => next(error));
};

module.exports.clearFavourites = (request, response, next) => {
  User.updateOne({ _id: request.params.id }, { $set: { favourites: [] } })
    .then((data) => {
      if (data.matchedCount == 0) {
        let error = new Error("this user doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response
        .status(200)
        .json({ data: "favourite cleared successfully..!", data });
    })
    .catch((error) => next(error));
};
////////////////////
cloudinary.config({
  cloud_name: "ds2uqpwc2",
  api_key: "436674829799529",
  api_secret: "wEfWi_gtZQAh2vHOC2H9OMb0EoE",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "users",
    // format: async (req, file) => "png", // example of using async function to set// the file format dynamically based on the request and file properties
  },
});
/////////////////
exports.upload = multer({ storage: storage });
exports.addProfileImage = (request, response, next) => {
  const publicId = request.file.path.replace(/^.*[\\\/]/, "").split(".")[0];
  const image = { url: request.file.path, publicId: publicId };
  User.updateOne({ _id: request.params.id }, { $set: { image: image } })
    .then((doc) => {
      if (doc.matchedCount == 0) {
        let error = new Error(" apartment id doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response
        .status(201)
        .json({ message: "image added to user successfully" });
    })
    .catch((err) => next(err));
};

exports.deleteProfileImage = (request, response, next) => {
  User.findOne({
    _id: request.params.id,
  })
    .then((doc) => {
      if (!doc) {
        let error = new Error("this apartment doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      cloudinary.uploader
        .destroy("users/" + request.body.imageId)
        .then((result) => {
          console.log(result);
          if (result.result == "not found") {
            let error = new Error("image id is not correct");
            error.statusCode = 404;
            throw error;
          }
          User.updateOne(
            { _id: request.params.id },
            {
              $set: { "image.url": "", "image.publicId": "" },
            }
          )
            .then((doc) => {
              if (doc.matchedCount == 0) {
                let error = new Error("this apartment doesn't exist");
                error.statusCode = 404;
                throw error;
              }
              response
                .status(200)
                .json({ message: " image is deleted successfully" });
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
