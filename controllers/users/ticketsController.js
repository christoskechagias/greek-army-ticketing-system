const path = require("path");
const Users = require("../../models/users.js");
const Comments = require("../../models/comments.js");
const { Tickets } = require("../../models/tickets.js");
const MESSAGES = require("../../utils/messages.json");
const Offices = require("../../models/offices.js");
const Brands = require("../../models/brands.js");
const Ranks = require("../../models/ranks.js");
const mongoose = require("mongoose");
const { UsersRoles } = require("../../models/roles.js");

const createTicket = async (req, res) => {
  const userId = req.user.id;
  const { subject, description, category: categoryId } = req.body;

  try {
    let imagePaths = [];
    if (req.file) {
      imagePaths = [`/uploads/${path.basename(req.file.path)}`];
    } else if (req.files) {
      imagePaths = req.files.map(
        (file) => `/uploads/${path.basename(file.path)}`
      );
    }

    const existingAuthor = await Users.findById(userId);

    if (!existingAuthor) {
      return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
    }

    const office = await Offices.findById(existingAuthor.office);
    if (!office) {
      return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
    }

    const rank = await Ranks.findById(existingAuthor.rank);
    if (!rank) {
      return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
    }

    const brand = await Brands.findById(existingAuthor.brand);
    if (!brand) {
      return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
    }

    let ticketId = Math.floor(10000 + Math.random() * 90000);

    let isUnique = false;
    while (!isUnique) {
      const existingTicket = await Tickets.findOne({ ticketId });
      if (!existingTicket) {
        isUnique = true;
      } else {
        ticketId = Math.floor(10000 + Math.random() * 90000);
      }
    }

    const newTicket = await Tickets.create({
      ticketId,
      subject,
      description,
      categoryId,
      author: {
        id: existingAuthor._id,
        firstName: existingAuthor.firstName,
        lastName: existingAuthor.lastName,
        office: office.description,
        brand: brand.abbreviation,
        rank: rank.abbreviation,
        phone: existingAuthor.phone,
      },
      images: imagePaths,
      status: "open",
    });

    if (newTicket) {
      return res
        .status(201)
        .json({ message: MESSAGES.TICKET_CREATION_SUCCESS });
    } else {
      return res
        .status(404)
        .json({ message: MESSAGES.TICKET_CREATION_FAILURE });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const fetchTickets = async (req, res) => {
  const userId = req.user.id;
  let searchQuery = { "author.id": userId };
  const { pagination = {}, search = "", filters = {} } = req.query;
  const page = parseInt(pagination.current, 10) || 1;
  const limit = parseInt(pagination.pageSize, 10) || 10;
  const skip = (page - 1) * limit;

  try {
    if (search) {
      searchQuery.$or = [
        { ticketId: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    if (filters.categories) {
      const categoryIds = filters.categories
        .split(",")
        .map((categoryId) => new mongoose.Types.ObjectId(categoryId));
      searchQuery.categoryId = { $in: categoryIds };
    }

    if (filters.status) {
      const status = filters.status.split(",");
      searchQuery.status = { $in: status };
    }

    const allTickets = await Tickets.aggregate([
      { $match: searchQuery },
      {
        $lookup: {
          from: "ticketcategories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      { $unwind: "$categoryDetails" },
      {
        $project: {
          _id: 1,
          ticketId: 1,
          subject: 1,
          description: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          categoryId: "$categoryDetails._id",
          category: "$categoryDetails.title",
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    const tickets = await Promise.all(
      allTickets.map(async (ticket) => {
        const hasUnread = await Comments.exists({
          ticketId: ticket._id,
          isRead: false,
          "author.id": { $ne: userId },
        });

        return {
          ...ticket,
          hasUnreadeadComments: hasUnread,
        };
      })
    );
    const totalTickets = await Tickets.countDocuments(searchQuery);
    return res.status(200).json({ totalTickets, tickets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const fetchTicket = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Tickets.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(ticketId) } }, // Match the ticket by ID
      {
        $lookup: {
          from: "ticketcategories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      { $unwind: "$categoryDetails" },
      {
        $project: {
          _id: 1,
          ticketId: 1,
          subject: 1,
          description: 1,
          status: 1,
          completedAt: 1,
          createdAt: 1,
          updatedAt: 1,
          category: "$categoryDetails.title",
          author: 1,
          images: 1,
        },
      },
    ]);

    if (ticket.length > 0) {
      const ticketDataWithImage = {
        ...ticket[0],
        images: ticket[0].images.map(
          (imgPath) => `/uploads/${path.basename(imgPath)}`
        ),
      };
      return res.status(200).json(ticketDataWithImage);
    } else {
      return res.status(404).json({ message: MESSAGES.TICKET_NOT_FOUND });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const createComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { text, ticketId } = req.body;

    const ticket = await Tickets.findById(ticketId);
    if (!ticket) {
      return res.status(400).json({ message: MESSAGES.TICKET_NOT_FOUND });
    }
    if (ticket.status === "completed") {
      return res
        .status(400)
        .json({ message: MESSAGES.COMMENT_CREATION_FAILURE });
    }

    const imagePaths =
      req.files && req.files.length > 0
        ? req.files.map((file) => `/uploads/${path.basename(file.path)}`)
        : [];

    const existingUser = await Users.findById(userId);
    const userRoles = await UsersRoles.find({ userId }).populate("roleId");
    const isAdminOrMember = userRoles.some(
      (role) => role.roleId.key === "admin" || role.roleId.key === "member"
    );
    const firstName = isAdminOrMember ? "ΓΕΠ" : existingUser.firstName;
    const lastName = isAdminOrMember ? "" : existingUser.lastName;

    const newComment = new Comments({
      text: text || "",
      images: imagePaths.length > 0 ? imagePaths : [],
      author: {
        id: existingUser.id,
        firstName,
        lastName,
      },
      ticketId,
      isRead: false,
    });

    const createdComment = await newComment.save();
    return res.status(201).json(createdComment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const fetchComments = async (req, res) => {
  const { ticketId } = req.params;
  const userId = req.user.id;

  try {
    const comments = await Comments.find({ ticketId });
    await Comments.updateMany(
      { ticketId, isRead: false, "author.id": { $ne: userId } },
      { $set: { isRead: true } }
    );
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  createTicket,
  fetchTickets,
  fetchTicket,
  createComment,
  fetchComments,
};
