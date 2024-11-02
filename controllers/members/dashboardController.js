const { Tickets } = require("../../models/tickets.js");
const MESSAGES = require("../../utils/messages.json");
const dayjs = require("dayjs");
const { Roles, UsersRoles } = require("../../models/roles.js");

const fetchMembersStats = async (req, res) => {
  try {
    const memberRole = await Roles.findOne({ key: "member" });

    const startOfMonth = dayjs().startOf("month").toDate();
    const endOfMonth = dayjs().endOf("month").toDate();

    const membersStats = await UsersRoles.aggregate([
      {
        $match: {
          roleId: memberRole._id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $unwind: "$userData",
      },
      {
        $lookup: {
          from: "tickets",
          let: { userId: "$userData._id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$assignee.id", { $toString: "$$userId" }] },
                completedAt: { $gte: startOfMonth, $lte: endOfMonth },
              },
            },
            {
              $group: {
                _id: "$assignee.id",
                completedTicketsCurrentMonth: {
                  $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
                },
              },
            },
          ],
          as: "ticketStats",
        },
      },
      {
        $unwind: {
          path: "$ticketStats",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "tickets",
          let: { userId: "$userData._id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$assignee.id", { $toString: "$$userId" }] },
                status: "completed",
              },
            },
            {
              $count: "completedTicketsAllTime",
            },
          ],
          as: "allTimeCompletedCounts",
        },
      },
      {
        $lookup: {
          from: "tickets",
          let: { userId: "$userData._id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$assignee.id", { $toString: "$$userId" }] },
                status: "inProgress",
              },
            },
            {
              $count: "inProgressTicketsAllTime",
            },
          ],
          as: "allTimeInProgressCounts",
        },
      },
      {
        $unwind: {
          path: "$allTimeCompletedCounts",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$allTimeInProgressCounts",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          completedTicketsCurrentMonth: {
            $ifNull: ["$ticketStats.completedTicketsCurrentMonth", 0],
          },
          completedTicketsAllTime: {
            $ifNull: ["$allTimeCompletedCounts.completedTicketsAllTime", 0],
          },
          inProgressTicketsAllTime: {
            $ifNull: ["$allTimeInProgressCounts.inProgressTicketsAllTime", 0],
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: { $concat: ["$userData.firstName", " ", "$userData.lastName"] },
          completedTicketsCurrentMonth: 1,
          completedTicketsAllTime: 1,
          inProgressTicketsAllTime: 1,
        },
      },
      {
        $sort: {
          completedTicketsAllTime: -1,
        },
      },
    ]);
    return res.status(200).json(membersStats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const fetchTicketsPerWeek = async (req, res) => {
  const { startOfWeek, endOfWeek } = req.query;

  try {
    const start = dayjs(startOfWeek).startOf("day");
    const end = dayjs(endOfWeek).endOf("day");

    const tickets = await Tickets.find({
      createdAt: { $gte: start.toDate(), $lt: end.toDate() },
    });

    const countsPerDay = {};
    let currentDate = start;

    while (currentDate.isBefore(end) || currentDate.isSame(end, "day")) {
      const formattedDate = currentDate.format("YYYY-MM-DD");
      countsPerDay[formattedDate] = { open: 0, inProgress: 0, completed: 0 };
      currentDate = currentDate.add(1, "day");
    }

    tickets.forEach((ticket) => {
      const ticketDate = dayjs(ticket.createdAt).format("YYYY-MM-DD");
      if (countsPerDay[ticketDate]) {
        countsPerDay[ticketDate][ticket.status]++;
      }
    });

    const openData = [];
    const completedData = [];
    const inProgressData = [];

    Object.keys(countsPerDay).forEach((date) => {
      openData.push(countsPerDay[date].open);
      inProgressData.push(countsPerDay[date].inProgress);
      completedData.push(countsPerDay[date].completed);
    });

    return res.status(200).json([
      {
        name: "Ανοιχτά",
        data: openData,
        group: "apexcharts-axis-0",
      },
      {
        name: "Σε εξέλιξη",
        data: inProgressData,
        group: "apexcharts-axis-0",
      },
      {
        name: "Ολοκληρωμένα",
        data: completedData,
        group: "apexcharts-axis-0",
      },
    ]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const fetchTicketsByDate = async (req, res) => {
  const { date } = req.query;

  try {
    const startOfDay = dayjs(date).startOf("day").toDate();
    const endOfDay = dayjs(date).endOf("day").toDate();

    const tickets = await Tickets.find({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    const data = {
      "07:00": 0,
      "08:00": 0,
      "09:00": 0,
      "10:00": 0,
      "11:00": 0,
      "12:00": 0,
      "13:00": 0,
      "14:00": 0,
      "15:00": 0,
    };

    tickets.forEach((item) => {
      const hour = dayjs(item.createdAt).startOf("hour").format("HH:mm");
      if (data[hour] !== undefined) {
        data[hour]++;
      }
    });

    const formattedData = Object.keys(data).map((hour) => {
      return data[hour];
    });

    const response = [
      {
        name: "Tickets",
        data: formattedData,
        group: "apexcharts-axis-0",
      },
    ];

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const fetchTodayTicketsStats = async (req, res) => {
  const startOfDay = dayjs().startOf("day").toDate();
  const endOfDay = dayjs().endOf("day").toDate();
  try {
    const [
      { openTickets = 0, inProgressTickets = 0, completedTickets = 0 } = {},
    ] = await Tickets.aggregate([
      {
        $match: {
          status: { $in: ["open", "inProgress", "completed"] },
        },
      },
      {
        $facet: {
          openTickets: [{ $match: { status: "open" } }, { $count: "count" }],
          inProgressTickets: [
            { $match: { status: "inProgress" } },
            { $count: "count" },
          ],
          completedTickets: [
            {
              $match: {
                status: "completed",
                completedAt: {
                  $gte: startOfDay,
                  $lt: endOfDay,
                },
              },
            },
            { $count: "count" },
          ],
        },
      },
      {
        $project: {
          openTickets: { $arrayElemAt: ["$openTickets.count", 0] },
          inProgressTickets: { $arrayElemAt: ["$inProgressTickets.count", 0] },
          completedTickets: { $arrayElemAt: ["$completedTickets.count", 0] },
        },
      },
    ]);
    return res.status(200).json({
      openTickets,
      inProgressTickets,
      completedTickets,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  fetchMembersStats,
  fetchTicketsPerWeek,
  fetchTicketsByDate,
  fetchTodayTicketsStats,
};
