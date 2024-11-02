const express = require("express");
const members = require("../controllers/members/index.js");
const { authenticateMiddleware } = require("../utils/utils.js");

const router = express.Router();

router.get(
  "/tickets",
  authenticateMiddleware,
  members.ticketsController.fetchTickets
);

router.get(
  "/tickets/:ticketId",
  authenticateMiddleware,
  members.ticketsController.fetchTicket
);

router.put(
  "/tickets/assign/me",
  authenticateMiddleware,
  members.ticketsController.updateTicketAssignee
);

router.put(
  "/tickets/status",
  authenticateMiddleware,
  members.ticketsController.updateTicketStatus
);

router.get(
  "/statistics/ticketsByWeek",
  authenticateMiddleware,
  members.dashboardController.fetchTicketsPerWeek
);
router.get(
  "/statistics/ticketsByDate",
  authenticateMiddleware,
  members.dashboardController.fetchTicketsByDate
);
router.get(
  "/statistics/tickets/today",
  authenticateMiddleware,
  members.dashboardController.fetchTodayTicketsStats
);
router.get(
  "/statistics",
  authenticateMiddleware,
  members.dashboardController.fetchMembersStats
);
module.exports = router;
