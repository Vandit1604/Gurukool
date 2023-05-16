const TokenModel = require("../Models/Token");
// Token Storage function to store the token data to the database
const TokenStorage = async (UserId, Token, Type, res) => {
  try {
    //to delete the token from the database
    await TokenModel.deleteMany({ UserId: UserId }).catch((error) =>
      console.log(error)
    );
    //checking of the token is to be added in the database or not
    if (Type === "Add") {
      // if Add
      // then generating the new token model
      const newToken = await new TokenModel({
        UserId: UserId,
        Token: Token,
      });
      //saving the token to the database
      await newToken.save().catch((error) =>
        res.status(500).json({
          Status: "Error",
          ErrorMessage:
            "Cannot send verification Email !!! \n Please try Later",
          ServerError: error,
        })
      );
    }
    //returning no response to the main function
    return;
  } catch (error) {
    //error response
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Cannot send verification Email !!! \n Please try Later",
      ServerError: error,
    });
  }
};
//exporting the Token
module.exports = TokenStorage;
