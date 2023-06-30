const mongoose = require("mongoose");
const ApiFeature = require("../utils/ApiFeature");
const Conversation = mongoose.model("Conversations");
const Message = mongoose.model("Messages");

exports.getAll = (request, response, next) => {
  const apiFeature = new ApiFeature(
    Conversation.find({ members: { $in: [request.params.id] } }).populate({
      path: "members",
      select: { password: 0 },
    }),
    request.query
  );

  apiFeature
    .paginate()
    .mongooseQuery.then((docs) => {
      if (!docs) {
        let error = new Error("there're no conversations  to show");
        error.statusCode = 404;
        throw error;
      }

      response.status(200).json({ data: docs, page: apiFeature.page });
    })
    .catch((err) => next(err));
};

exports.openConversation = (request, response, next) => {
  Conversation.findOne({
    members: { $all: [...request.body.members] },
  })
    .then((conversationDoc) => {
      if (!conversationDoc) {
        new Conversation(request.body)
          .save()
          .then((conversationDoc) => {
            if (!conversationDoc) {
              let error = new Error(
                "can't add this conversation check your data"
              );
              error.statusCode = 404;
              throw error;
            }
            console.log("conversation created");
            response.status(200).json(conversationDoc);
          })
          .catch((err) => {
            next(err);
          });
      } else {
        console.log("conversation already exists");
        response.status(200).json(conversationDoc);
      }
    })
    .catch((err) => {
      next(err);
    });
};
exports.makeConvoMessagesSeen = (request, response, next) => {
  Message.updateMany(
    { conversationId: request.body.conversationId, seen: false },
    { $set: { seen: true } }
  )
    .then((doc) => {
      if (doc.matchedCount == 0) {
        let error = new Error(" conversationId doesn't exist");
        error.statusCode = 404;
        throw error;
      }
      response.status(201).json({ message: "messages updated successfully" });
    })
    .catch((err) => {
      next(err);
    });
};
