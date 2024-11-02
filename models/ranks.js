const mongoose = require("mongoose");

const ranksSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    abbreviation: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);
const Ranks = mongoose.model("Ranks", ranksSchema);

module.exports = Ranks;
