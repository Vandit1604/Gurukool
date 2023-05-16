const TokenModel = require("../Models/Token");
//Validation function to  checking the token validation
const Validation = async (AccessToken, res) => {
  try {
    //finding token and return true if it is found and false if not found
    const Token = await TokenModel.findOne({ Token: AccessToken });
    if (Token) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    //sending the error response
    return res.status(500).json({
      Status: "Error",
      ErrorMessage: "Cannot send verification Email !!! \n Please try Later",
      ServerError: error,
    });
  }
};
//exporting the validation function
module.exports = Validation;
