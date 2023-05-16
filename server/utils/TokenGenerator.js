const jwt = require("jsonwebtoken");
//creating the new token using jwt
const CreateToken = ({ _id, Email, isAdmin }, res) => {
  //generating a accessToken and returning it to the file.
  //this accessToken will have UserId and Email and valid till 30s of creating
  try {
    //creating the new access token using sign() function
    const accessToken = jwt.sign(
      {
        _id,
        Email,
        isAdmin,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "15m" }
    );
    //if accessToken is generated
    if (accessToken) {
      //return the generated accessToken
      return accessToken;
    } else {
      //return the error response
      return res.status(500).json({
        Status: "Error",
        ErrorMessage: "Cannot Secure The User Data!!! \n please try Later",
      });
    }
  } catch (error) {
    //sending the error response to the client
    return res.status(500).json({
      Status: "Error",
      ErrorMessage: "Cannot send verification Email !!! \n Please try Later",
      ServerError: error,
    });
  }
};
module.exports = CreateToken;
