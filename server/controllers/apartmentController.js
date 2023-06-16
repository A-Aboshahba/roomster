const mongoose = require("mongoose");
const Apartment = mongoose.model("Apartments");

const cloudinary = require("cloudinary").v2;
// configuration file
cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});
const CloudinaryStorage =
  require("multer-storage-cloudinary").CloudinaryStorage;
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "apartments",
    allowedFormats: ["jpg", "png"],
  },
});
const multer = require("multer");
exports.upload = multer({ storage: storage });

exports.getAllApartments = (request, response, next) => {
  Apartment.find({})
    .then((docs) => {
      if (!docs) {
        let error = new Error("there're no apartments to show");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(docs);
    })
    .catch((err) => {
      next(err);
    });
};

// b31rp2qoowoxtv8llsen
exports.addNewApartment = (request, response, next) => {
  new Apartment(request.body)
    .save()
    .then((apartDoc) => {
      if (!apartDoc) {
        let error = new Error("can't add this apartment check your data");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(apartDoc);
    })
    .catch((err) => {
      next(err);
    });
};
exports.getApartmentById = (request, response, next) => {
  Apartment.findById(request.params.id)
    .then((doc) => {
      if (!doc) {
        let error = new Error("this apartment doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(doc);
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteApartment = (request, response, next) => {
  Apartment.deleteOne({ _id: request.params.id })
    .then((doc) => {
      if (doc.matchedCount == 0) {
        let error = new Error("this apartment doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response
        .status(200)
        .json({ message: " apartment is deleted successfully" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateApartment = (request, response, next) => {
  Apartment.updateOne({ _id: request.params.id }, request.body)
    .then((doc) => {
      if (doc.matchedCount == 0) {
        let error = new Error(" apartment id doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(201).json({ message: "appartment updated successfully" });
    })
    .catch((err) => {
      next(err);
    });
};
exports.removeSingleImage = (request, response, next) => {
  // async await version
  // try {
  // const apartment1 = await Apartment.findOne(
  //   { images: { $elemMatch: { publicId: request.body.imageId } } },
  //   { images: 1, _id: 0 }
  // );

  // if (!apartment1) {
  //   const error = new Error("This apartment doesn't exist");
  //   error.statusCode = 404;
  //   throw error;
  // }

  // const apartment = await Apartment.findOne(
  //   { images: { $elemMatch: { publicId: request.body.imageId } } },
  //   { images: 1, _id: 0 }
  // );

  // if (!apartment) {
  //   const error = new Error("This apartment doesn't exist");
  //   error.statusCode = 404;
  //   throw error;
  // }

  // const deleteResult = await cloudinary.uploader.destroy(
  //   "apartments/" + request.body.imageId
  // );
  // console.log(deleteResult);

  // const updateResult = await Apartment.updateOne(
  //   { _id: request.params.id },
  //   { $pull: { images: { publicId: request.body.imageId } } }
  // );

  // if (updateResult.matchedCount === 0) {
  //   const error = new Error("This apartment doesn't exist");
  //   error.statusCode = 404;
  //   throw error;
  // }

  // } catch (error) {
  //   next(error);
  // }

  Apartment.findOne(
    {
      images: { $elemMatch: { publicId: request.body.imageId } },
    },
    { images: 1, _id: 0 }
  )
    .then((doc) => {
      if (!doc) {
        let error = new Error("this apartment doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      cloudinary.uploader
        .destroy("apartments/" + request.body.imageId)
        .then((result) => {
          console.log(result);

          if (result.result == "not found") {
            let error = new Error("image id is not correct");
            error.statusCode = 404;
            throw error;
          }

          Apartment.updateOne(
            { _id: request.params.id },
            {
              $pull: {
                images: { publicId: request.body.imageId },
              },
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

exports.addSingleImage = (request, response, next) => {
  const result = request.file;
  console.log("request obj", request.body.userId);

  const publicId = request.file.path.replace(/^.*[\\\/]/, "").split(".")[0];

  //   response.status(200).json({ result, publicId });

  const image = { url: request.file.path, publicId: publicId };
  Apartment.updateOne({ _id: request.params.id }, { $push: { images: image } })
    .then((doc) => {
      if (doc.matchedCount == 0) {
        let error = new Error(" apartment id doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response
        .status(201)
        .json({ message: "image added to apartment successfully" });
    })
    .catch((err) => next(err));
};

exports.addMultipleImages = (request, response, next) => {
  const images = [];

  for (const image of request.files) {
    const publicId = image.path.replace(/^.*[\\\/]/, "").split(".")[0];
    const fetchedImage = { url: image.path, publicId: publicId };
    images.push(fetchedImage);
  }
  Apartment.updateOne(
    { _id: request.params.id },
    { $push: { images: { $each: images } } }
  )
    .then((doc) => {
      if (doc.matchedCount == 0) {
        let error = new Error(" apartment id doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response
        .status(201)
        .json({ message: "images added to apartment successfully" });
    })
    .catch((err) => next(err));
};
