//This route is for Conversation and saving and getting the data accordingly

const route = require("express").Router();
const Verification = require("../Middleware/TokenVerification");
const Conversation = require("../Models/Conversation");
//the post route to start and save the newConversation
route.post("/", (req, res) => {
  //creating the new Conversation Model
  const newConversation = new Conversation({
    Members: [req.body.senderId, req.body.receiverId],
  });
  try {
    //trying to save the data to the database
    newConversation
      .save()
      .then(() => {
        //sending the response to the client
        res.status(200).json({
          Status: "Success",
          Message: "Data Saved Successfully",
          Conversation: newConversation,
        });
      })
      .catch((err) => {
        //sending the error response to the client
        res.status(200).json({
          Status: "Error",
          ErrorMessage: "Something went wrong!!!",
          serverError: err,
        });
      });
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something went wrong!!!",
    });
  }
});
//getting the Conversation according to the User
route.get("/:UserId", async (req, res) => {
  try {
    // finding the User
    const data = await Conversation.find({
      Members: { $in: [req.params.UserId] },
    });
    //sending the response to the client
    res.status(200).json({
      Status: "Success",
      Message: "Request Success",
      Conversation: data,
    });
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something went wrong!!!",
    });
  }
});
//exporting the route
module.exports = route;
