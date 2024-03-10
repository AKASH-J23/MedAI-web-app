const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    consultation_fee: {
      type: Number,
      required: true,
    },
    availability: {
      type: Array,
      required: true,
    },
    contact_no: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
