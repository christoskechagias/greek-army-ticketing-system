const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: false },
  rank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ranks",
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brands",
    required: true,
  },
  office: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offices",
    required: true,
  },
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
