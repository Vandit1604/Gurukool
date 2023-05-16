//Token Route to get new Token and saving to the database
const route = require("express").Router();
const UserModel = require("../Models/User");
//utils files to Generating the storing the token
const TokenGenerator = require("../utils/TokenGenerator");
const TokenStorage = require("../utils/TokenStorage");
//POST route to get the data and saving to the database
route.post("/", async (req, res) => {
  try {
    //finding user with UserEmail
    const User = await UserModel.findOne({
      Email: req.body.Email,
    });
    if (User) {
      //generating the token
      const Token = await TokenGenerator(User, res);
      //storing the data
      await TokenStorage(User._id, Token, "Add", res);
      //sending the 200 status code with AccessToken
      return res.status(200).json({
        Status: "Success",
        Message: "token Created SuccessFully",
        AccessToken: Token,
      });
    }
    //sending the error with status code 200
    return res.status(200).json({
      Status: "Error",
      ErrorMessage: "User credentials not found !!!",
    });
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something went Wrong !!",
      ServerError: error,
    });
  }
});
//exporting the module with routes
module.exports = route;
