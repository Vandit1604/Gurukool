const route = require("express").Router();
//middleware to verify the User
const Verification = require("../Middleware/TokenVerification");
const BlogModel = require("../Models/Blog");

//Posting new Blog Post
route.post("/", Verification, async (req, res) => {
  //exceptional handling
  try {
    //after verification req has an object as Token Data and we can access the User id and adding that to the blog model data
    req.body.UserId = req.TokenData._id;
    //creating the blogModel
    const newBlog = await new BlogModel(req.body);
    //saving the blog data into the database
    await newBlog
      .save()
      .then(() =>
        res.status(200).json({
          Status: "Success",
          Message: "Request Success",
          newBlog,
        })
      )
      .catch((error) =>
        res.status(500).json({
          Status: "Error",
          ErrorMessage: "Something went Wrong!!!",
          serverError: error,
        })
      );
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something went Wrong!!!",
      serverError: error,
    });
  }
});
//getting the blog data from the database
route.get("/", async (req, res) => {
  try {
    let Blogs = [];
    //if any query then get data according the query
    if (req.query.id) {
      Blogs = await BlogModel.find({ _id: req.query.id }).catch((error) =>
        res.status(500).json({
          Status: "Error",
          ErrorMessage: "Something went Wrong!!!",
          serverError: error,
        })
      );
    } else {
      Blogs = await BlogModel.find({}).catch((error) =>
        res.status(500).json({
          Status: "Error",
          ErrorMessage: "Something went Wrong!!!",
          serverError: error,
        })
      );
    }
    //sending the response
    res.status(200).json({
      Status: "Success",
      Message: "Request Success",
      Blogs,
    });
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something went Wrong!!!",
      serverError: error,
    });
  }
});
//deleting the blog post route
route.delete("/delete", Verification, async (req, res) => {
  try {
    //trying to delete the blog data from the database
    await BlogModel.deleteOne({ _id: req.body.id }).catch((error) =>
      res.status(500).json({
        Status: "Error",
        ErrorMessage: "Doubt get request, on '/' route",
        ServerError: error,
      })
    );
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
//PUT request for editing the Blog details
route.put("/edit/:id", Verification, async (req, res) => {
  try {
    //finding the data with id and updating the data accordingly
    const Blog = await BlogModel.findByIdAndUpdate(
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
    //sending the response to the client
    return res.status(200).json({
      Status: "Success",
      Message: "Blog Deleted SuccessFully",
      Blog,
    });
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      ErrorMessage: "Cannot delete the Blog Post",
      ServerError: err,
    });
  }
});
//exporting the module
module.exports = route;
