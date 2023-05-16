const route = require("express").Router();
const Verification = require("../Middleware/TokenVerification");
const ForumModel = require("../Models/Forum");

//POST route to add new Doubt
route.post("/Add", Verification, async (req, res) => {
  //after Verification the control comes here
  try {
    req.body.UserId = req.TokenData._id;
    const newQuestion = await new ForumModel(req.body);
    newQuestion
      .save()
      .then(() => {
        res.status(200).json({
          Status: "Success",
          Message: "Successfully Added your Question",
        });
      })
      .catch((err) => {
        res.status(200).json({
          Status: "Error",
          ErrorMessage: "Cannot Find records in forum section",
          ServerError: err,
        });
      });
  } catch (err) {
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Catch in forum add",
      ServerError: err,
    });
  }
});

route.get("/", async (req, res) => {
  try {
    // get all records
    const Questions = await ForumModel.find({}).catch((error) =>
      res.status(500).json({
        Status: "Error",
        ErrorMessage: "Doubt get request, on '/' route",
        ServerError: err,
      })
    );
    //sending the response to the client
    return res.status(200).json({
      Status: "Success",
      Message: "Request Success",
      Questions,
    });
  } catch (err) {
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Doubt get request, on '/' route",
      ServerError: err,
    });
  }
});
//delete Route to delete the Doubt post
route.delete("/delete", Verification, async (req, res) => {
  try {
    //deleting one
    await ForumModel.deleteOne({ _id: req.body.id }).catch((error) =>
      res.status(500).json({
        Status: "Error",
        ErrorMessage: "Doubt get request, on '/' route",
        ServerError: error,
      })
    );
    //sending the response to the server
    return res.status(200).json({
      Status: "Success",
      Message: "Blog Deleted SuccessFully",
    });
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Cannot delete the Blog Post",
      ServerError: err,
    });
  }
});

//PUT request to edit the data
route.put("/edit/:id", Verification, async (req, res) => {
  try {
    //if Comment -> update the comment with UserId
    if (req.body.Comments) {
      req.body.Comments[0].UserId = req.TokenData._id;
    }
    //updating the Question data and getting the updated data
    const Question = await ForumModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    ).catch((error) =>
      res.status(500).json({
        Status: "Error",
        ErrorMessage: "Doubt get request, on '/' route",
        ServerError: error,
      })
    );
    //sending the response to the client  with updated data
    return res.status(200).json({
      Status: "Success",
      Message: "Blog Deleted SuccessFully",
      Question,
    });
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Cannot delete the Blog Post",
      ServerError: err,
    });
  }
});
module.exports = route;
