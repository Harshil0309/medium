const express = require("express");
const newPostController = require("../controllers/task");
const router = express.Router();

router.post("/newPost", newPostController.newPost);
router.post("/getAllTasks", newPostController.getAllTasks);
router.post("/getTask", newPostController.getTask);
router.delete("/deleteTask", newPostController.deleteTask);
module.exports = router;
