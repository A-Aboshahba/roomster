const mongoose = require("mongoose");
const schema = mongoose.Schema;

const location = new mongoose.Schema(
  {
    city: String,
    street: String,
    building: Number,

    country: String,
    floorNo: Number,
    description: String,
  },
  { _id: false }
);

const reservationInfo = new mongoose.Schema(
  {
    startDate: Date,
    endDate: Date,
    totalPrice: Number,
    guestId: { type: schema.Types.ObjectId, ref: "Users" },
  },
  { _id: false }
);

const image = new mongoose.Schema(
  {
    publicId: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);
const apartmentSpecification = new mongoose.Schema(
  {
    noOfBalcony: Number,
    noOfRooms: Number,
    noOfBeds: Number,
    hasWifi: Boolean,
    hasKitchen: Boolean,
  },
  { _id: false }
);

const model = new mongoose.Schema(
  {
    // _id: {
    //   type: schema.Types.ObjectId,
    //   default: () => new mongoose.Types.ObjectId(),
    // },
    userId: { type: schema.Types.ObjectId, ref: "Users", required: true },

    price: { type: Number, required: true },
    apartmentSpecification: apartmentSpecification,
    type: String,
    location: location,
    reservationInfo: reservationInfo,
    images: { type: [image] },
  },
  { timestamps: true }
);

mongoose.model("Apartments", model);
