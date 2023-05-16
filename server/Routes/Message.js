//this route is to handel Messages
const route = require("express").Router();
const Message = require("../Models/Message");
//POST request to get the new message
route.post("/", (req, res) => {
  //creating new Message Model
  const newMessage = new Message(req.body);
  try {
    //trying to save newMessage data in the backend and then sending the response accordingly
    newMessage
      .save()
      .then(() => {
        //sending the response as 200 -->
        res.status(200).json({
          Status: "Success",
          Message: "Data Saved Successfully",
          newMessage: newMessage,
        });
      })
      .catch((err) => {
        res.status(200).json({
          Status: "Error",
          ErrorMessage: "Something went wrong!!!",
        });
      });
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something went wrong!!!",
    });
  }
});

//GET messages from the database according to the chats
route.get("/:conversationId", async (req, res) => {
  try {
    // finding the Messages with the conversation Id
    const data = await Message.find({
      conversationId: req.params.conversationId,
    });
    //Sending the response accordingly ==> 200-> for success and 500 --> error
    await res.status(200).json({
      Status: "Success",
      Message: "Request Success",
      MessageData: data,
    });
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something went wrong!!!",
    });
  }
});
//exporting the module
module.exports = route;
