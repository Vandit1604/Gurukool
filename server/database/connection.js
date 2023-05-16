//configuring the .env file
require("dotenv").config();
// getting-started.js
const mongoose = require("mongoose");

//main function to connect the database
async function main() {
  //connecting the database
  await mongoose
    .connect('mongodb://localhost:27017/gurukool-local')
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => console.log(error));
}
//exporting the main function
module.exports = main;
