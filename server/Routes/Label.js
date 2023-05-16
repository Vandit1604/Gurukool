//this is the route to handle the Label requests
const route = require("express").Router();
const LabelModel = require("../Models/Labels");

//POST request to add new Label in the database
route.post("/Add", (req, res) => {
  try {
    //creating the new label model
    const newLabel = new LabelModel({
      Label: req.body.Label,
      Color: req.body.Color,
    });
    //saving the label model in database
    newLabel
      .save()
      .then(() =>
        res.status(200).json({
          Status: "Success",
          Message: "Label Created",
          Label: newLabel,
        })
      )
      .catch((error) =>
        res.status(200).json({
          Status: "Error",
          ErrorMessage: "cannot create label !!!",
          ServerError: error,
        })
      );
  } catch (error) {
    return res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something went wrong !!!",
      ServerError: error,
    });
  }
});
//getting label from the database
route.get("/", (req, res) => {
  try {
    //if any query then find the data accordingly
    if (req.query.Label) {
      //find label accordingly and then send the response
      LabelModel.findOne({ Label: req.query.Label }, (error, Label) => {
        if (error) {
          //if any error occur then send the error response with status code 500
          return res.status(500).json({
            Status: "Error",
            ErrorMessage: `cannot find any label names as ${req.query.Label}}`,
            ServerError: error,
          });
        }
        if (Label) {
          //if label is found successfully then send the response with Label
          return res.status(200).json({
            Status: "Success",
            Message: `Successfully Found the Labels`,
            Label: Label,
          });
        } else {
          //if any error occur
          return res.status(500).json({
            Status: "Error",
            ErrorMessage: `cannot find any label names as ${req.query.Label}}`,
          });
        }
      });
    } else {
      //finding all the Labels from the database
      LabelModel.find({}, (error, Label) => {
        if (error) {
          //if any error occur then send the response with status code 200
          return res.status(200).json({
            Status: "Error",
            ErrorMessage: `cannot find any label names as ${req.query.Label}}`,
            ServerError: error,
          });
        }
        if (Label) {
          //Label is found then send the 200 response with Label data
          return res.status(200).json({
            Status: "Success",
            Message: `Successfully Found the Labels`,
            Label: Label,
          });
        } else {
          //if any error occur
          return res.status(200).json({
            Status: "Error",
            ErrorMessage: `cannot find any label names as ${req.query.Label}}`,
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something went wrong !!!",
      ServerError: error,
    });
  }
});
//exporting the module
module.exports = route;
