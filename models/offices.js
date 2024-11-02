const mongoose = require("mongoose");

const officesSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Offices = mongoose.model("Offices", officesSchema);

module.exports = Offices;
