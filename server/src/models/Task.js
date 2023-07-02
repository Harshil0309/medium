const mongoose = require("mongoose");

const TaskTypes = require("../config/TaskType");

const TaskSchema = mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  priority: {
    type: String,
    required: true,
    enum: [TaskTypes.LOW, TaskTypes.MEDIUM, TaskTypes.HIGH],
  },
});

module.exports = mongoose.model("tasks", TaskSchema);
