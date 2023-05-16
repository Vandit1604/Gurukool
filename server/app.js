//API FILES
const express = require("express");
const path = require("path");
const app = express();
const Cors = require("cors");

//Api Database Connection
const connection = require("./database/connection");
connection();

//Api Route Files
const Auth = require("./Routes/Auth");
const User = require("./Routes/User");
const Labels = require("./Routes/Label");
const Forum = require("./Routes/Forum");
const Token = require("./Routes/Token");
const Conversation = require("./Routes/Conversation");
const Message = require("./Routes/Message");
const Blog = require("./Routes/Blog");
const ImageUpload = require("./Routes/ImageUpload");

//App Middleware's
app.use(Cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "/public")));

// Pusher Api
const Pusher = require("./Pusher");
const mongoose = require("mongoose");
const db = mongoose.connection;

//Pusher Realtime Helping Function
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  const MessageCollection = db.collection("messages");
  const ChangeStream = MessageCollection.watch();
  ChangeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const newMessage = change.fullDocument;
      Pusher.trigger("Messages", "inserted", {
        _id: newMessage._id,
        conversationId: newMessage.conversationId,
        message: newMessage.message,
        sender: newMessage.sender,
      });
    } else {
      console.log("Error");
    }
  });
});

//Api Routes
app.use("/api/Auth", Auth);
app.use("/api/User", User);
app.use("/api/Label", Labels);
app.use("/api/Forum", Forum);
app.use("/api/Token", Token);
app.use("/api/Conversation", Conversation);
app.use("/api/Message", Message);
app.use("/api/Blog", Blog);
app.use("/api/Image", ImageUpload);

// // Serve static files in prodoction
// // if (process.env.NODE_ENV === "production") {
// app.use(express.static("client/build"));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });
// // }

//Server Listening (locally at port 8080)
const Port = process.env.PORT || 8080;
app.listen(Port, () => {
  console.log("Backend server is running at port", Port);
});
