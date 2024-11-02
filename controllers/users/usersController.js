const Users = require("../../models/users.js");
const { UsersRoles } = require("../../models/roles.js");
const bcrypt = require("bcrypt");
const MESSAGES = require("../../utils/messages.json");
const { generateJWT, setIdTokenCookie } = require("../../utils/utils.js");
const Offices = require("../../models/offices.js");
const Brands = require("../../models/brands.js");
const Ranks = require("../../models/ranks.js");

const login = async (req, res) => {
  try {
    const existedUser = await Users.findOne({
      userName: req.body.userName,
    });
    if (existedUser) {
      if (bcrypt.compareSync(req.body.password, existedUser.password)) {
        const idToken = generateJWT(existedUser);
        setIdTokenCookie(res, idToken);
        const url = "/tickets/my";
        return res.status(200).json(url);
      }
    }
    res.status(401).json({ message: MESSAGES.INVALID_USERNAME_OR_PASSWORD });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("id_token");
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const fetchProfile = async (req, res) => {
  let office = {};
  let brand = {};
  let rank = {};

  try {
    const existedUser = await Users.findOne({ _id: req.user.id });
    if (!existedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const userRoles = await UsersRoles.find({ userId: req.user.id }).populate(
      "roleId"
    );
    const keys = userRoles.map((userRole) => userRole.roleId.key);

    if (existedUser.office) {
      office = await Offices.findById({ _id: existedUser.office });
    }

    if (existedUser.brand) {
      brand = await Brands.findById({ _id: existedUser.brand });
    }

    if (existedUser.rank) {
      rank = await Ranks.findById({ _id: existedUser.rank });
    }

    const responseData = {
      ...existedUser.toObject(),
      roles: keys,
      office,
      brand,
      rank,
    };
    return res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  login,
  logout,
  fetchProfile,
};
