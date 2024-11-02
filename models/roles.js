const mongoose = require("mongoose");

const roleSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    key: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Roles = mongoose.model("Roles", roleSchema);

const usersRolesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roles",
      required: true,
    },
  },
  { timestamps: true }
);
const UsersRoles = mongoose.model("UsersRoles", usersRolesSchema);

module.exports = { Roles, UsersRoles };
