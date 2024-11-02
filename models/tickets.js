const mongoose = require("mongoose");

const ticketsSchema = new mongoose.Schema(
  {
    ticketId: { type: String, required: true, unique: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TicketCategories",
      required: true,
      index: true,
    },
    author: {
      id: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      brand: { type: String, required: true },
      rank: { type: String, required: true },
      phone: { type: String, required: true },
      office: { type: String, required: true },
    },
    images: [{ type: String }],
    status: {
      type: String,
      enum: ["open", "inProgress", "completed"],
      required: true,
      index: true,
    },
    assignee: {
      id: { type: String, index: true },
      firstName: { type: String },
      lastName: { type: String },
      brand: { type: String },
      rank: { type: String },
      assignedAt: { type: Date },
    },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

ticketsSchema.index({ ticketId: 1 });
ticketsSchema.index({ categoryId: 1 });
ticketsSchema.index({ status: 1 });

const Tickets = mongoose.model("Tickets", ticketsSchema);

const ticketCategoriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    key: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const TicketCategories = mongoose.model(
  "TicketCategories",
  ticketCategoriesSchema
);

module.exports = { Tickets, TicketCategories };
