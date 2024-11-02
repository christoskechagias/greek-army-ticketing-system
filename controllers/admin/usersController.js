const Users = require("../../models/users.js");
const { UsersRoles, Roles } = require("../../models/roles.js");
const bcrypt = require("bcrypt");
const MESSAGES = require("../../utils/messages.json");
const Offices = require("../../models/offices.js");
const Brands = require("../../models/brands.js");
const Ranks = require("../../models/ranks.js");

const createUser = async (req, res) => {
  const {
    userName,
    password,
    firstName,
    lastName,
    rank,
    brand,
    phone,
    office,
    roleId,
  } = req.body;

  if (
    !userName ||
    !password ||
    !firstName ||
    !lastName ||
    !rank ||
    !brand ||
    !office ||
    !roleId
  ) {
    return res.status(400).json({ message: MESSAGES.MISSING_REQUIRED_FIELDS });
  }

  try {
    const existingUser = await Users.findOne({ userName });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: MESSAGES.USERNAME_ALREADY_EXISTS });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      userName,
      password: hashedPassword,
      firstName,
      lastName,
      rank,
      brand,
      office,
      phone,
    });

    const createdUser = await newUser.save();
    if (!createdUser) {
      return res.status(500).json({ message: MESSAGES.USER_CREATION_FAILURE });
    }

    const role = await Roles.findById(roleId);

    if (!role) {
      return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
    }

    const userRoleAssignment = await new UsersRoles({
      userId: createdUser._id,
      roleId: role._id,
    }).save();

    if (!userRoleAssignment) {
      return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
    }

    return res.status(201).json({ message: MESSAGES.USER_CREATION_SUCCESS });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const updateUser = async (req, res) => {
  const { _id, userName, firstName, lastName, rank, brand, office, phone } =
    req.body;

  if (
    !_id ||
    !userName ||
    !firstName ||
    !lastName ||
    !rank ||
    !brand ||
    !office
  ) {
    return res.status(400).json({ message: MESSAGES.MISSING_REQUIRED_FIELDS });
  }

  try {
    const existingUser = await Users.findById(_id);
    if (userName !== existingUser.userName) {
      const userNameAlreadyExists = await Users.findOne({ userName });
      if (userNameAlreadyExists) {
        return res
          .status(409)
          .json({ message: MESSAGES.USERNAME_ALREADY_EXISTS });
      }
    }

    const updatedUser = await Users.findByIdAndUpdate(
      _id,
      { userName, firstName, lastName, rank, brand, office, phone },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).json({
        message: MESSAGES.USER_UPDATE_FAILURE,
      });
    }

    return res.status(200).json({
      message: MESSAGES.USER_UPDATE_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const updateUserPassword = async (req, res) => {
  const { _id, password } = req.body;
  try {
    const existingUser = await Users.findById(_id);
    if (!existingUser) {
      return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    existingUser.password = hashedPassword;
    const updatedUser = await existingUser.save();
    if (updatedUser) {
      return res
        .status(200)
        .json({ message: MESSAGES.PASSWORD_UPDATE_SUCCESS });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Users.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
    }

    await UsersRoles.deleteMany({ userId });

    return res
      .status(200)
      .json({ message: MESSAGES.USER_DELETION_SUCCESS, userId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const fetchUsers = async (req, res) => {
  let searchQuery = {};

  const { pagination = {}, search = "" } = req.query;
  const page = parseInt(pagination.current, 10) || 1;
  const limit = parseInt(pagination.pageSize, 10) || 10;
  const skip = (page - 1) * limit;

  try {
    if (search) {
      searchQuery.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ];
    }

    const users = await Users.aggregate([
      { $match: searchQuery },
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "userBrand",
        },
      },
      { $unwind: "$userBrand" },
      {
        $lookup: {
          from: "ranks",
          localField: "rank",
          foreignField: "_id",
          as: "userRank",
        },
      },
      { $unwind: "$userRank" },
      {
        $lookup: {
          from: "usersroles",
          localField: "_id",
          foreignField: "userId",
          as: "userRoles",
        },
      },
      {
        $lookup: {
          from: "roles",
          localField: "userRoles.roleId",
          foreignField: "_id",
          as: "roles",
        },
      },

      {
        $addFields: {
          isAdmin: {
            $in: ["admin", "$roles.key"],
          },
        },
      },

      {
        $project: {
          _id: 1,
          userName: 1,
          firstName: 1,
          lastName: 1,
          brand: "$userBrand.abbreviation",
          class: 1,
          rank: "$userRank.abbreviation",
          officePhoneNumber: 1,
          office: 1,
          phone: 1,
          roles: "$roles.title",
          isAdmin: 1,
        },
      },
      {
        $sort: {
          roles: 1,
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    const totalUsers = search
      ? await Users.countDocuments(searchQuery)
      : await Users.countDocuments();

    return res.status(200).json({ users, totalUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const fetchUser = async (req, res) => {
  let office = {};
  let brand = {};
  let rank = {};
  const { userId } = req.params;
  try {
    const existedUser = await Users.findById(userId);
    if (!existedUser) {
      return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
    }
    const userRole = await UsersRoles.findOne({ userId }).populate("roleId");

    if (existedUser.office) {
      office = await Offices.findById({ _id: existedUser.office });
    }

    if (existedUser.brand) {
      brand = await Brands.findById({ _id: existedUser.brand });
    }

    if (existedUser.rank) {
      rank = await Ranks.findById({ _id: existedUser.rank });
    }
    const userObject = existedUser.toObject();

    delete userObject.password;
    const responseData = {
      ...userObject,
      role: {
        _id: userRole.roleId._id,
        key: userRole.roleId.key,
      },
      office,
      brand,
      rank,
    };
    return res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const fetchMembers = async (req, res) => {
  try {
    const users = await UsersRoles.aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "roleId",
          foreignField: "_id",
          as: "roleDetails",
        },
      },
      {
        $unwind: "$roleDetails",
      },
      {
        $match: {
          "roleDetails.key": { $in: ["member", "admin"] },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          _id: "$userDetails._id",
          firstName: "$userDetails.firstName",
          lastName: "$userDetails.lastName",
        },
      },
    ]);

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser,
  fetchMembers,
};
