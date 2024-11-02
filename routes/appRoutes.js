const express = require("express");
const appController = require("../controllers/appController.js");
const router = express.Router();
router.get("/roles", appController.fetchRoles);
router.get("/offices", appController.fetchOffices);
router.get("/ranks", appController.fetchRanks);
router.get("/brands", appController.fetchBrands);
router.get("/ticket/categories", appController.fetchTicketCategories);

module.exports = router;
