const express = require("express");
const server = express();
const InitiateMongoServer = require("./config/db");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

const PORT = 5000;
server.use(bodyParser());

server.use("/api/users", userRouter);
server.use("/api/task", taskRouter);


InitiateMongoServer()
  .then(() => {
    server.listen(PORT, () => {
      console.log("Listening to server");
    });
  })
  .catch(() => {
    console.log("Can't connect to DB!!");
  });
