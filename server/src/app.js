const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const PORT = 5000;
server.use(bodyParser());

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.listen(PORT, () => {
  console.log("Listening to server");
});
