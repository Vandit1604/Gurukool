const mongoose = require("mongoose");
//creating the Blog Schema
const BlogSchema = new mongoose.Schema(
  {
    UserId: String,
    Title: String,
    Caption: String,
    Article: String,
    Image: {
      type: String,
      default:
        "https://www.wallpapertip.com/wmimgs/168-1682192_samsung-default-wallpaper.jpg",
    },
    Labels: Array,
  },
  { timestamps: true }
);
//exporting the blog model
module.exports = mongoose.model("blogs", BlogSchema);
