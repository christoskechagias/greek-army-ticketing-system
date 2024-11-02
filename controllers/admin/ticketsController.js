const { Tickets } = require("../../models/tickets.js");
const MESSAGES = require("../../utils/messages.json");
const Comments = require("../../models/comments.js");
const mongoose = require("mongoose");
const Users = require("../../models/users.js");
const Ranks = require("../../models/ranks.js");
const Brands = require("../../models/brands.js");

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
          createdAt: 1,
          updatedAt: 1,
          category: "$categoryDetails.title",
          author: 1,
          assignee: 1,
          completedAt: 1,
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

const fetchTickets = async (req, res) => {
  const userId = req.user.id;
  let searchQuery = {};
  const { pagination = {}, search = "", filters = {} } = req.query;
  const page = parseInt(pagination.current, 10) || 1;
  const limit = parseInt(pagination.pageSize, 10) || 10;
  const skip = (page - 1) * limit;

  try {
    if (search) {
      searchQuery.$or = [
        { ticketId: { $regex: search, $options: "i" } }, //i => case-insensitive
        { subject: { $regex: search, $options: "i" } },
        { "author.firstName": { $regex: search, $options: "i" } },
        { "author.lastName": { $regex: search, $options: "i" } },
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
          assignee: 1,
          author: 1,
          sortStatus: {
            $cond: [
              { $eq: ["$status", "open"] },
              1,
              { $cond: [{ $eq: ["$status", "inProgress"] }, 2, 3] },
            ],
          },
        },
      },
      { $sort: { createdAt: -1, sortStatus: 1 } },
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

const updateTicketAssignee = async (req, res) => {
  const { ticketId, assigneeId } = req.body;
  try {
    const user = await Users.findById(assigneeId);
    if (!user) {
      return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
    }
    const rank = await Ranks.findById(user.rank);
    const brand = await Brands.findById(user.brand);

    const ticket = await Tickets.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: MESSAGES.TICKET_NOT_FOUND });
    }

    const updatedTicket = await Tickets.findByIdAndUpdate(
      ticketId,
      {
        $set: {
          assignee: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            brand: brand?.abbreviation,
            rank: rank?.abbreviation,
            assignedAt: new Date(),
          },
          status: "inProgress",
        },
      },
      { new: true }
    ).populate({
      path: "categoryId",
      select: "title",
    });

    if (!updatedTicket) {
      return res.status(404).json({ message: MESSAGES.TICKET_NOT_FOUND });
    }
    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const updateTicketStatus = async (req, res) => {
  const { ticketId } = req.body;
  try {
    let ticket = await Tickets.findByIdAndUpdate(
      ticketId,
      { status: "completed", completedAt: new Date() },
      { new: true }
    );

    if (!ticket) {
      return res
        .status(404)
        .json({ message: MESSAGES.TICKET_STATUS_UPDATE_AS_COMPLETED_FAILURE });
    }

    return res.status(200).json({
      ticket,
      message: MESSAGES.TICKET_STATUS_UPDATE_AS_COMPLETED_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const deleteTickets = async (req, res) => {
  const ticketsIds = req.body;

  if (!Array.isArray(ticketsIds) || ticketsIds.length === 0) {
    return res.status(400).json({ message: MESSAGES.TICKET_NOT_FOUND });
  }

  try {
    const result = await Tickets.deleteMany({
      _id: { $in: ticketsIds },
    });
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: MESSAGES.TICKETS_DELETION_FAILURE });
    }
    return res.status(200).json({ message: MESSAGES.TICKETS_DELETION_SUCCESS });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
module.exports = {
  fetchTickets,
  updateTicketAssignee,
  fetchTicket,
  updateTicketStatus,
  deleteTickets,
};
