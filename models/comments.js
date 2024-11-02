const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    text: { type: String },
    images: [{ type: String }],
    author: {
      id: { type: String, required: true },
      firstName: { type: String },
      lastName: { type: String },
    },
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tickets",
      required: true,
    },
    isRead: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;
