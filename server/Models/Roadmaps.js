const mongoose = require("mongoose");
//defining the Roadmap schema
const RoadMapSchema = new mongoose.Schema(
  {
    UserId: String,
    Roadmap: String,
    Caption: String,
    Label: Array,
  },
  { timestamps: true }
);
//exporting the roadmap model
module.exports = mongoose.model("roadmaps", RoadMapSchema);
