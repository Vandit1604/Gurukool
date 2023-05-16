//getting the json web token file
const jwt = require("jsonwebtoken");
//TokenDecoder function to get the decoded the token data
const TokenDecoder = async (Token, res) => {
  try {
    //decoding the token using jwt.decode() function
    const decodedToken = await jwt.decode(Token, process.env.TOKEN_KEY);
    //returning the decoded token data
    return decodedToken;
  } catch (error) {
    //sending the error response to the client
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something went Wrong !!",
      ServerError: error,
    });
  }
};
//exporting the function
module.exports = TokenDecoder;
