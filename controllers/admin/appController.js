const Banners = require("../../models/banners.js");
const MESSAGES = require("../../utils/messages.json");

const createBanner = async (req, res) => {
  const { title, isActive = false } = req.body;

  if (!title) {
    return res.status(400).json({ message: MESSAGES.MISSING_REQUIRED_FIELDS });
  }

  try {
    const newBanner = new Banners({ title, isActive: isActive });
    const createdBanner = await newBanner.save();
    if (!createdBanner) {
      return res.status(500).json({
        message: MESSAGES.BANNER_CREATION_SUCCESS,
      });
    }
    return res
      .status(201)
      .json({ banner: createdBanner, message: MESSAGES.USER_CREATION_SUCCESS });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const fetchBanners = async (req, res) => {
  try {
    const banners = await Banners.find();
    return res.status(200).json(banners);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const deleteBanner = async (req, res) => {
  const { bannerId } = req.params;
  console.log(bannerId);
  try {
    const banner = await Banners.findByIdAndDelete(bannerId);

    if (!banner) {
      return res.status(404).json({ message: MESSAGES.BANNER_NOT_FOUND });
    }

    return res
      .status(200)
      .json({ message: MESSAGES.BANNER_DELETION_SUCCESS, bannerId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const updateBanner = async (req, res) => {
  const { _id, title, isActive } = req.body;

  try {
    const updatedBanner = await Banners.findByIdAndUpdate(
      _id,
      { title, isActive },
      { new: true }
    );

    if (!updatedBanner) {
      return res.status(500).json({
        message: MESSAGES.BANNER_UPDATE_FAILURE,
      });
    }

    return res.status(200).json({
      message: MESSAGES.BANNER_UPDATE_SUCCESS,
      banner: updatedBanner,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
module.exports = { createBanner, deleteBanner, fetchBanners, updateBanner };
