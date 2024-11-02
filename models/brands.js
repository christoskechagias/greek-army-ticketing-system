const mongoose = require("mongoose");

const brandsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    abbreviation: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);
const Brands = mongoose.model("Brands", brandsSchema);

module.exports = Brands;
