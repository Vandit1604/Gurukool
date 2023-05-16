const route = require("express").Router();

const multer = require("multer");
//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
// It is written on top of busboy for maximum efficiency

//middleware for file storage
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = req.body.FileName.split(".")[1];
    if (ext === "jpeg") {
      cb(null, "public/Images/jpeg");
    } else if (ext === "png") {
      cb(null, "public/Images/png");
    } else if (ext === "jpg") {
      cb(null, "public/Images/jpg");
    } else if (ext === "pdf") {
      cb(null, "public/pdf");
    } else if (ext === "mp4") {
      cb(null, "public/Videos");
    } else if (ext === "mp3") {
      cb(null, "public/Audio");
    } else if (ext === "gif") {
      cb(null, "public/Images/gif");
    } else {
      cb(null, "public/other");
    }
  },
  filename: (req, file, cb) => {
    cb(null, req.body.FileName);
  },
});
//upload function to pass as a middleware to upload a file
const Upload = multer({ storage: Storage });

//post route to upload a file
route.post("/Upload", Upload.single("file"), (req, res) => {
  //finally the image is successfully uploaded and the response is send with status code 200
  res.status(200).json({
    Status: "Success",
    Message: "File Uploaded SuccessFully",
  });
});

//exporting module
module.exports = route;
