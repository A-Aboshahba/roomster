const mongoose = require("mongoose");
const schema = mongoose.Schema;

const address = new mongoose.Schema(
  {
    country: { type: String, required: true },
    city: { type: String, required: true },
  },
  { _id: false }
);

const model = new mongoose.Schema(
  {
    // _id: {
    //   type: schema.Types.ObjectId,
    //   default: () => new mongoose.Types.ObjectId(),
    // },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      url: { type: String },
      publicId: { type: String },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    address: {
      type: address,
      required: true,
    },
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // ref: "Apartments",
      },
    ],
  },
  { timestamps: true }
);

mongoose.model("Users", model);
/*[
    {
        "_id": "646f6fb4d93baed7b9172ed8",
        "firstName": "adminf",
        "lastName": "adminl",
        "fullName": "adminf adminl",
        "email": "admin@test.com",
        "password": "U2FsdGVkX1+fCQ6yRPZI9A+vsOAVOp7NFlmtRDmCKOs=",
        "image": "adminimg.jpg",
        "isAdmin": true,
        "address": {
            "country": "Egypt",
            "city": "Tanta"
        },
        "createdAt": "2023-05-25T14:24:52.393Z",
        "updatedAt": "2023-05-25T14:24:52.393Z",
        "__v": 0
    },
    {
        "_id": "646f8ab970c9fba4c199ec1e",
        "firstName": "ahmed",
        "lastName": "omar",
        "fullName": "ahmed omar",
        "email": "ahmed@test.com",
        "password": "U2FsdGVkX1+sIXIlfPqfeDr3rJcyDJ81dN40XtGu8I0=",
        "image": "ahmed.jpg",
        "isAdmin": false,
        "address": {
            "country": "Egypt",
            "city": "mansoura"
        },
        "createdAt": "2023-05-25T16:20:09.422Z",
        "updatedAt": "2023-05-25T16:20:09.422Z",
        "__v": 0
    },
    {
        "_id": "646fdc862de445452d426b0b",
        "firstName": "abdo",
        "lastName": "mousa",
        "fullName": "abdo mousa",
        "email": "abdo@test.com",
        "password": "U2FsdGVkX197VRX6ErTi9NQMp0GrCRo5A6YtIHZfsr0=",
        "image": "abdo.jpg",
        "isAdmin": false,
        "address": {
            "country": "Egypt",
            "city": "Cairo"
        },
        "createdAt": "2023-05-25T22:09:10.618Z",
        "updatedAt": "2023-05-25T22:09:10.618Z",
        "__v": 0
    }
]*/
