const mongoose = require("mongoose");

const bannersSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    isActive: { type: Boolean },
  },
  {
    timestamps: true,
  }
);
const Banners = mongoose.model("Banners", bannersSchema);

module.exports = Banners;
