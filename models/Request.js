const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  requestedItem: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: false,
  },
  itemType: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  discordName: {
    type: String,
    required: true,
  },
  requestedDate: {
    type: Date,
  },
  completedBy: {
    type: String,
  },
  completedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Request", RequestSchema);
