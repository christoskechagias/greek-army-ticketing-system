const Offices = require("../models/offices.js");
const Brands = require("../models/brands.js");
const Ranks = require("../models/ranks.js");
const { Roles } = require("../models/roles");
const { TicketCategories } = require("../models/tickets.js");

const MESSAGES = require("../utils/messages.json");

const fetchTicketCategories = async (req, res) => {
  try {
    const categories = await TicketCategories.find();
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const fetchOffices = async (req, res) => {
  try {
    const offices = await Offices.find();
    return res.status(200).json(offices);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const fetchRanks = async (req, res) => {
  try {
    const ranks = await Ranks.find();
    return res.status(200).json(ranks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const fetchBrands = async (req, res) => {
  try {
    const brands = await Brands.find();
    return res.status(200).json(brands);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const fetchRoles = async (req, res) => {
  try {
    const existingRoles = await Roles.find({
      key: { $in: ["member", "user"] },
    });
    res.status(200).json(existingRoles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  fetchRoles,
};

module.exports = {
  fetchOffices,
  fetchRanks,
  fetchBrands,
  fetchTicketCategories,
  fetchRoles,
};
