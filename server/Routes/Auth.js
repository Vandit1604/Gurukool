const UserModel = require("../Models/User");
const route = require("express").Router();
//for password security
const bcrypt = require("bcrypt");
//getting the utils files for generating , accessing and Storing the token in the database and user verification
const TokenGenerator = require("../utils/TokenGenerator.js");
const TokenStorage = require("../utils/TokenStorage");

//Register Route to register the new User
route.post("/Register", async (req, res) => {
  try {
    //
    const date = new Date();
    //generating the salts
    const salt = bcrypt.genSaltSync(10);

    //securing the password using bcrypt
    const HashedPassword = bcrypt.hashSync(req.body.Password, salt);
    //crating new User
    const newUser = new UserModel({
      RouteId: date.getTime(),
      AccountType: req.body.AccountType,
      Name: req.body.Name,
      UserName: req.body.Name.split(" ").join("") + date.getTime(),
      Email: req.body.Email,
      Password: HashedPassword,
    });
    // saving the newUser
    newUser
      .save()
      .then(() =>
        res.status(200).json({
          Status: "Success",
          Message: "Successfully Register your Account",
        })
      )
      .catch((error) =>
        res.status(200).json({
          Status: "Error",
          ErrorMessage:
            "Cannot Register your Account,Please try with different credentials !!",
          ServerError: error,
        })
      );
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something went wrong !!!",
      ServerError: error,
    });
  }
});
//SignIn Route - to get the Registered User
route.post("/SignIn", async (req, res) => {
  try {
    //finding the user using the email of the User
    const User = await UserModel.findOne({ Email: req.body.Email }).catch(
      (error) =>
        res.status(500).json({
          Status: "Error",
          ErrorMessage: "Something went Wrong !!!",
          ServerError: error,
        })
    );
    if (User) {
      //for comparing the secure password and User req password the password -- user security
      const valid = bcrypt.compareSync(req.body.Password, User.Password);
      if (!valid) {
        return res.status(200).json({
          Status: "Error",
          ErrorMessage: "Invalid Password !!",
        });
      }
      //if User is found then generate the token
      const AccessToken = await TokenGenerator(User, res);
      //store the token in db
      await TokenStorage(User._id, AccessToken, "Add", res);
      //filtering the data
      const { _id, Password, ...other } = User._doc;
      //send the response
      return res.status(200).json({
        Status: "Success",
        Message: "Successfully LogIn your Account",
        User: other,
        AccessToken: AccessToken,
      });
    } else {
      //if no user is found
      return res.status(200).json({
        Status: "Error",
        ErrorMessage: "No User Found !!",
      });
    }
  } catch (error) {
    //if any backend error occur
    return res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something went Wrong !!!",
      ServerError: error,
    });
  }
});
//exporting the route
module.exports = route;
