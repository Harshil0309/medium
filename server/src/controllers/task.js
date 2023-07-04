const Task = require("../models/Task");
const TaskTypes = require("../config/TaskType");

const newPost = async (req, res, next) => {
  try {
    const { user_id, heading, content, priority } = req.body;
    let taskPriority = null;
    if (priority == TaskTypes.LOW) {
      taskPriority = TaskTypes.LOW;
    } else if (priority == TaskTypes.MEDIUM) {
      taskPriority = TaskTypes.MEDIUM;
    } else if (priority == TaskTypes.HIGH) {
      taskPriority = TaskTypes.HIGH;
    }

    const newTask = new Task({
      user_id,
      heading,
      content,
      priority: taskPriority,
    });

    const savedTask = await newTask.save();
    return res.json({
      message: "Task Added Succesfully",
      data: savedTask,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error occured!! Try Again.",
    });
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const tasks = await Task.find({ user_id });
    return res.json({
      message: "Your Tasks Are",
      data: tasks,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Some Error Occured!!",
    });
  }
};

const getTask = async (req, res, next) => {
  try {
    const { id } = req.body;
    const task = await Task.findOne({ _id: id });
    return res.json({
      message: "Here are the details of the task",
      data: task,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error Finding task!!",
    });
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.body;

    const result = await Task.deleteOne({ _id: id });
    console.log(result);

    return res.json({ message: "Task delteted successfully" });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = { newPost, getAllTasks, getTask, deleteTask };
