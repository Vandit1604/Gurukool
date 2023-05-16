const mongoose = require("mongoose");
//defining the Token schema
const TokenSchema = new mongoose.Schema(
  {
    UserId: String,
    Token: String,
  },
  { timestamps: true }
);
//exporting the token model
module.exports = mongoose.model("token", TokenSchema);
