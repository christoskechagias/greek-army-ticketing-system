const express = require("express");
const admin = require("../controllers/admin/index.js");
const { authenticateMiddleware } = require("../utils/utils.js");

const router = express.Router();

router.put(
  "/app/banners/update",
  authenticateMiddleware,
  admin.appController.updateBanner
);
router.delete(
  "/app/banners/:bannerId",
  authenticateMiddleware,
  admin.appController.deleteBanner
);
router.get(
  "/app/banners",
  authenticateMiddleware,
  admin.appController.fetchBanners
);
router.post(
  "/app/banners/create",
  authenticateMiddleware,
  admin.appController.createBanner
);

router.delete(
  "/tickets",
  authenticateMiddleware,
  admin.ticketsController.deleteTickets
);

router.put(
  "/tickets/status",
  authenticateMiddleware,
  admin.ticketsController.updateTicketStatus
);

router.get(
  "/tickets/:ticketId",
  authenticateMiddleware,
  admin.ticketsController.fetchTicket
);

router.put(
  "/tickets/assignee",
  authenticateMiddleware,
  admin.ticketsController.updateTicketAssignee
);

router.get(
  "/members",
  authenticateMiddleware,
  admin.usersController.fetchMembers
);
router.get(
  "/users/:userId",
  authenticateMiddleware,
  admin.usersController.fetchUser
);
router.post(
  "/users/new",
  authenticateMiddleware,
  admin.usersController.createUser
);
router.put(
  "/users/update/password",
  authenticateMiddleware,
  admin.usersController.updateUserPassword
);
router.put(
  "/users/update",
  authenticateMiddleware,
  admin.usersController.updateUser
);
router.delete(
  "/users/:userId",
  authenticateMiddleware,
  admin.usersController.deleteUser
);
router.get("/users", authenticateMiddleware, admin.usersController.fetchUsers);

router.get(
  "/tickets",
  authenticateMiddleware,
  admin.ticketsController.fetchTickets
);

module.exports = router;
