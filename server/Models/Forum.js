const mongoose = require("mongoose");
//creating a Forum schema
const ForumSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      required: true,
    },
    Question: {
      type: String,
      required: true,
    },
    Labels: {
      type: Array,
      default: [String],
    },
    Comments: {
      type: Array,
      default: [],
    },
    isSolved: {
      type: Boolean,
      default: false,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    Replies: {
      type: Array,
      default: [],
    },
    Solutions: {
      type: {
        UserId: String,
        Solution: String,

        default: {},
      },
      default: {},
    },
  },
  { timestamps: true }
);

//exporting the forum module
module.exports = mongoose.model("forum", ForumSchema);
