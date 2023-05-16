const route = require("express").Router();
const RoadmapModel = require("../Models/Roadmaps");
route.post("/", Verification, async (req, res) => {
  try {
    req.body.UserId = req.TokenData._id;
    const newRoadmap = await new RoadmapModel(req.body);
    await newRoadmap
      .save()
      .then(() => {
        res.status(200).json({
          Status: "Success",
          Message: "Roadmap Uploaded Successfully",
          Roadmap: newRoadmap,
        });
      })
      .catch((error) => {
        res.status(500).json({
          Status: "Error",
          ErrorMessage: "Something went wrong!!!",
          serverError: error,
        });
      });
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something went wrong!!!",
      serverError: error,
    });
  }
});
route.get("/", (req, res) => {
  try {
    if (req.query.UserId) {
      console.log("Hii");
    }
  } catch (error) {}
});
