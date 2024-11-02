const Banners = require("../../models/banners.js");
const MESSAGES = require("../../utils/messages.json");

const fetchBanners = async (req, res) => {
  try {
    const banners = await Banners.find({ isActive: true });
    return res.status(200).json(banners);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { fetchBanners };
