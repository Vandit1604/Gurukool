const mongoose = require("mongoose");
//defining the Label model
const LabelsSchema = new mongoose.Schema(
  {
    Label: String,
    Topics: {
      type: Number,
      default: 0,
    },
    Color: String,
  },
  { timestamps: true }
);
//exporting the label model
module.exports = mongoose.model("labels", LabelsSchema);
