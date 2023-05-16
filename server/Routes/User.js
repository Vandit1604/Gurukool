//This route handel the USER Requests and User Related requests
const route = require("express").Router();
const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
//Utils files
const Verification = require("../Middleware/TokenVerification");
const TokenStorage = require("../utils/TokenStorage");
const TokenDecoder = require("../utils/TokenDecoder");
//PUT request to update the User
route.put("/Update", Verification, async (req, res) => {
  //after the Verification control come here
  try {
    // if there is a request for Password request
    if (req.body.Password) {
      //securing the Password using bcrypt
      const salt = bcrypt.genSaltSync(10);
      const HashedPassword = bcrypt.hashSync(req.body.Password, salt);
      //replacing the user request password with hashed one
      req.body.Password = HashedPassword;
    }
    //if User requested to update te UserName
    if (req.body.UserName) {
      //find the duplicate UserName exists in the database
      const User = await UserModel.find({ UserName: req.body.UserName }).catch(
        (error) =>
          res.status(500).json({
            Status: "Error",
            ErrorMessage: "Something went Wrong !!",
            ServerError: error,
          })
      );
      //if User is found
      if (User.length !== 0) {
        //sending the error message to the client
        return res.status(200).json({
          Status: "Error",
          ErrorMessage: "UserName Already In use",
        });
      }
    }
    //finally finding the User with id and updating the User
    const User = await UserModel.findByIdAndUpdate(
      req.TokenData._id,
      {
        $set: req.body,
      },
      { new: true }
    ).catch((error) =>
      res.status(500).json({
        Status: "Error",
        ErrorMessage: "Something went Wrong !!",
        ServerError: error,
      })
    );
    //sending then Success response to the client
    res.status(200).json({
      Status: "Success",
      Message: "Account updated SuccessFully",
      User: User,
    });
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something went Wrong !!",
      ServerError: error,
    });
  }
});
//Handling LogOut --> When User Logout then the token data stored in the database need to be deleted
//no need to verify the user --> User need to be LogOut if it is not verified ---> think of a hacked account
route.get("/LogOut", async (req, res) => {
  try {
    //getting the decoded token data
    const User = await TokenDecoder(req.headers.token);
    //Removing the Token from the database
    await TokenStorage(User._id, req.headers.token, "Remove", res);
    //sending the Success response to the client
    res.status(200).json({
      Status: "Success",
      Message: "SuccessFully Logged Out !!",
    });
  } catch (error) {
    //if any error occur then send the Error response to the client
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something went Wrong !!",
      ServerError: error,
    });
  }
});
//handling the Account Deletion
route.post("/delete", Verification, (req, res) => {});
//finding the User with query
route.get("/Find", async (req, res) => {
  console.log("Hiii");
  console.log(req.query);
  try {
    // query based on UserName--> find User with UserName and accordingly
    if (req.query.Name) {
      const User = await UserModel.find({ Name: req.query.Name });
      res.status(200).json({
        Status: "Success",
        Message: "User Details are :",
        User: User,
      });
    } else if (req.query.UserName) {
      const User = await UserModel.find({ UserName: req.query.UserName });
      res.status(200).json({
        Status: "Success",
        Message: "User Details are :",
        User: User,
      });
    } else if (req.query.id) {
      const User = await UserModel.find({ _id: req.query.id });
      res.status(200).json({
        Status: "Success",
        Message: "User Details are :",
        User: User,
      });
    } else if (req.query.RouteId) {
      const User = await UserModel.find({ RouteId: req.query.RouteId });
      res.status(200).json({
        Status: "Success",
        Message: "User Details are :",
        User: User,
      });
    } else {
      res.status(500).json({
        Status: "Error",
        ErrorMessage: "Something went Wrong !!",
        ServerError: error,
      });
    }
  } catch (error) {
    //sending the error response to the client
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something went Wrong !!",
      ServerError: error,
    });
  }
});

//getting the User with user id

route.get("/GetUser/:id", async (req, res) => {
  try {
    //finding the User with the mongoose id
    const User = await UserModel.findById({ _id: req.params.id });
    //if no user found
    if (!User) {
      //send the error message to the client
      return res.status(200).json({
        Status: "Error",
        ErrorMessage: "No User Found !!",
      });
    } else {
      //filtering the data
      const { Password, ...other } = User._doc;
      //sending success response to the client
      res.status(200).json({
        Status: "Success",
        Message: "User Details are :",
        User: other,
      });
    }
  } catch (error) {
    //sending the error response to the client
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something went Wrong !!",
      ServerError: error,
    });
  }
});
//Getting the User with RouteId
route.get("/:RouteId", async (req, res) => {
  try {
    //finding the User with RouteId and sending the data accordingly
    const User = await UserModel.findOne({ RouteId: req.params.RouteId }).catch(
      (error) =>
        res.status(500).json({
          Status: "Error",
          ErrorMessage: "Cannot find the user",
          ServerError: error,
        })
    );
    if (User.length !== 0) {
      res.status(200).json({
        Status: "Success",
        Message: "UserFound SuccessFully",
        User,
      });
    } else {
      res.status(400).json({
        Status: "Error",
        ErrorMessage: "No User Found",
        ServerError: error,
      });
    }
  } catch (error) {
    return res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something went Wrong !!",
      ServerError: error,
    });
  }
});
//exporting the module  and route
module.exports = route;
