//Token Handling Files
const TokenModel = require("../Models/Token");
const TokenDecoder = require("../utils/TokenDecoder");
const TokenGenerator = require("../utils/TokenGenerator");
const TokenStorage = require("../utils/TokenStorage");
//Middleware to verify the Token data
const TokenValidation = require("../utils/TokenValidation");

//Verification function to handel User verification
const Verification = async (req, res, next) => {
  try {
    //Token Validation
    const valid = await TokenValidation(req.headers.token, res);
    if (valid) {
      //if Token is Valid
      //decoding the Token
      const TokenData = await TokenDecoder(req.headers.token, res);
      //adding the TokenData object to the req object
      req.TokenData = TokenData;
      //generating the newToken
      const newToken = await TokenGenerator(TokenData, res);
      //setting the headers to send the response
      res.setHeader("token", newToken);
      //storing the token to the backend
      await TokenStorage(TokenData._id, newToken, "Add", res);
      //callback function to transfer the control to the main(requesting) function
      return next();
    }
    //if the Token is not valid then delete the token from the database
    await TokenStorage(TokenData.UserId, newToken, "Remove", res);
    //sending the error message to the client
    return res.status(200).json({
      Status: "Error",
      ErrorMessage: "You are not permitted to update the Account",
    });
  } catch (error) {
    //sending the error response to the client
    return res.status(500).json({
      Status: "Error",
      ErrorMessage: "You are not permitted to update the Account",
      ServerError: error,
    });
  }
};
//exporting the module
module.exports = Verification;
