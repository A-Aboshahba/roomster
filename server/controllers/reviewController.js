const mongoose = require("mongoose");
const Review = mongoose.model("Reviews");

exports.getAllReviews = (request, response, next) => {
  const { page = 1, limit = 10 } = request.query;

  const skip = (page - 1) * limit;
  let totalCount;
  Review.countDocuments().then((count) => {
    totalCount = count;
  });
  Review.find({})
    .populate({
      path: "userId",
      select: { fullName: 1, email: 1, _id: 0 },
    })
    .skip(skip)
    .limit(parseInt(limit))

    .then((docs) => {
      if (!docs) {
        let error = new Error("there're no reviews  to show");
        error.statusCode = 404;
        throw error;
      }
      let totalCount;
      Review.countDocuments()
        .then((count) => {
          totalCount = count;
          console.log(totalCount);
          response.status(200).json({
            reviews: docs,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalCount / limit),
            totalReviews: totalCount,
          });
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
      next(err);
    });
};

exports.getApartmentReviews = (request, response, next) => {
  const { page = 1, limit = 10 } = request.query;

  const skip = (page - 1) * limit;
  let totalCount;
  Review.countDocuments().then((count) => {
    totalCount = count;
  });
  Review.find({ apartmentId: request.params.id })
    .populate({
      path: "userId",
      select: { fullName: 1, email: 1, _id: 0 },
    })
    .skip(skip)
    .limit(parseInt(limit))
    .then((docs) => {
      if (!docs) {
        let error = new Error("there're no reviews  to show");
        error.statusCode = 404;
        throw error;
      }
      let totalCount;
      Review.countDocuments()
        .then((count) => {
          totalCount = count;
          console.log(totalCount);
          response.status(200).json({
            reviews: docs,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalCount / limit),
            totalReviews: totalCount,
          });
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
      next(err);
    });
};
exports.addNewReview = (request, response, next) => {
  new Review(request.body)
    .save()
    .then((apartDoc) => {
      if (!apartDoc) {
        let error = new Error("can't add this review check your data");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(apartDoc);
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateReview = (request, response, next) => {
  Review.updateOne({ _id: request.params.id }, request.body)
    .then((doc) => {
      if (doc.matchedCount == 0) {
        let error = new Error(" review id doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(201).json({ message: "review updated successfully" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteReview = (request, response, next) => {
  Review.deleteOne({ _id: request.params.id })
    .then((doc) => {
      if (doc.matchedCount == 0) {
        let error = new Error("this review doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json({ message: " review is deleted successfully" });
    })
    .catch((err) => {
      next(err);
    });
};
