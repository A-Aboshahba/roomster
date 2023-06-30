const mongoose = require("mongoose");
const ApiFeature = require("../utils/ApiFeature");
const Notification = mongoose.model("Notifications");
const Users = mongoose.model("Users");

exports.getAll = (request, response, next) => {
  const apiFeature = new ApiFeature(
    Notification.find({ receiverId: request.params.id }).populate({
      path: "senderId",
      select: { password: 0 },
    }),
    // .populate({
    //   path: "receiverId",
    //   select: { password: 0 },
    // })
    request.query
  );

  apiFeature
    .paginate()
    .mongooseQuery.then((docs) => {
      if (!docs) {
        let error = new Error("there're no notifications  to show");
        error.statusCode = 404;
        throw error;
      }

      response.status(200).json({ data: docs, page: apiFeature.page });
    })
    .catch((err) => next(err));
};

exports.addNewNotification = (request, response, next) => {
  new Notification(request.body)
    .save()
    .then((notificationDoc) => {
      if (!notificationDoc) {
        let error = new Error("can't add this notification check your data");
        error.statusCode = 404;
        throw error;
      }
      response.status(200).json(notificationDoc);
    })
    .catch((err) => {
      next(err);
    });
};
exports.makeAllSeen = (request, response, next) => {
  Notification.updateMany(
    { receiverId: request.params.id, seen: false },
    { $set: { seen: true } }
  )
    .then((doc) => {
      if (doc.matchedCount == 0) {
        let error = new Error(" receiver id doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response
        .status(201)
        .json({ message: "notifications updated successfully" });
    })
    .catch((err) => {
      next(err);
    });
};

// exports.getApartmentReviews = (request, response, next) => {
//   const apiFeature = new ApiFeature(
//     Review.find({ apartmentId: request.params.id })
//       .populate({
//         path: "userId",
//         // select: { fullName: 1, email: 1, _id: 0 },
//       })
//       .populate({ path: "apartmentId" }),
//     request.query
//   );

//   apiFeature
//     .paginate()
//     .mongooseQuery.then((docs) => {
//       let totalReveiws = 0;
//       if (!docs) {
//         let error = new Error("there're no reviews  to show");
//         error.statusCode = 404;
//         throw error;
//       }
//       docs.forEach((review) => {
//         totalReveiws += review.rate;
//       });
//       response.status(200).json({
//         data: docs,
//         page: apiFeature.page,
//         totalRate: (totalReveiws / docs.length).toFixed(2),
//       });
//     })
//     .catch((err) => next(err));
// };

// exports.deleteReview = (request, response, next) => {
//   Review.deleteOne({ _id: request.params.id })
//     .then((doc) => {
//       if (doc.matchedCount == 0) {
//         let error = new Error("this review doesn't exist");
//         error.statusCode = 404;
//         throw error;
//       }
//       response.status(200).json({ message: " review is deleted successfully" });
//     })
//     .catch((err) => {
//       next(err);
//     });
// };
