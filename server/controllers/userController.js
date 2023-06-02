const mongoose = require("mongoose");
const User = mongoose.model("Users");
const ObjectId = require("mongoose").Types.ObjectId;

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
//##############################################################

module.exports.getUserBooks = (request, response, next) => {
  console.log(request.params.id);
  // User.findOne({ _id: request.params.id })
  User.aggregate([
    {
      $match: { _id: new ObjectId(request.params.id) },
    },
    {
      $lookup: {
        from: Book.collection.name,
        foreignField: "_id",
        localField: "books",
        as: "booksBorrowed",
      },
    },
    {
      $project: { booksBorrowed: 1 },
    },
  ])
    .then((data) => {
      console.log(data);
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};
module.exports.addTeacher = (request, response, next) => {
  let object = new Teacher(request.body);
  object
    .save()
    .then((data) => {
      response.status(201).json(data);
    })
    .catch((error) => {
      console.log("sadasdas");
      next(error);
    });
};

module.exports.deleteTeacher = (request, response, next) => {
  Teacher.deleteOne({ _id: request.body._id })
    .then((data) => {
      return Class.updateOne(
        { supervisor: request.body._id },
        { $set: { supervisor: null } }
      );
    })
    .then((data) => {
      response.status(200).json({ data: "deleted  Teacher successfully..!" });
    })
    .catch((error) => next(error));
};

module.exports.getSupervise = (request, response, next) => {
  Class.aggregate([
    {
      $lookup: {
        from: Teacher.collection.name,
        localField: "supervisor",
        foreignField: "_id",
        as: "supervisor",
      },
    },
    { $unwind: { path: "$supervisor" } },
    {
      $project: { name: 1, supervisor: 1 },
    },
  ])
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
  // Class.findOne({ _id: 2 }, { supervisor: 1 })
  //   .then((data) => {
  //     return Teacher.findOne({ _id: data.supervisor });
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     response.status(200).json(data);
  //   })
  //   .catch((error) => next(error));
};
