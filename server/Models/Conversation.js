const mongoose = require("mongoose");
//creating the Conversation Schema
const ConversationSchema = new mongoose.Schema(
  {
    Members: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
//exporting the conversation model
module.exports = new mongoose.model("Conversation", ConversationSchema);
