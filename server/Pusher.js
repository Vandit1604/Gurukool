// Pusher file to make the mongoose database realtime
const Pusher = require("pusher");

//pusher object
const pusher = new Pusher({
  appId: "1301014",
  key: "2ef50e61b4881d2ae5d8",
  secret: "24d668bd110dbc264e9f",
  cluster: "ap2",
  useTLS: true,
});

//exporting the pusher object
module.exports = pusher;
