const express = require("express");
const users = require("../controllers/users/index.js");
const multer = require("multer");
const { authenticateMiddleware, storage } = require("../utils/utils");
const router = express.Router();
const upload = multer({ storage });

router.post("/login", users.usersController.login);

router.delete("/logout", users.usersController.logout);

router.get(
  "/profile",
  authenticateMiddleware,
  users.usersController.fetchProfile
);

router.get(
  "/tickets/:ticketId",
  authenticateMiddleware,
  users.ticketsController.fetchTicket
);
router.get(
  "/tickets",
  authenticateMiddleware,
  users.ticketsController.fetchTickets
);

router.post(
  "/tickets",
  authenticateMiddleware,
  upload.array("images"),
  users.ticketsController.createTicket
);

router.post(
  "/comments",
  authenticateMiddleware,
  upload.array("images"),
  users.ticketsController.createComment
);

router.get(
  "/tickets/:ticketId/comments",
  authenticateMiddleware,
  users.ticketsController.fetchComments
);

router.get("/app/banners", users.appController.fetchBanners);

module.exports = router;
