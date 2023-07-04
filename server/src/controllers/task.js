const Task = require("../models/Task");
const TaskTypes = require("../config/TaskType");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: "harshilgupta562@gmail.com",
    pass: "nvuvccshujibrehn!",
  },
});

const sendEmail = async (email, content, priority) => {
  try {
    const notification = {
      from: "harshilgupta562@gmail.com",
      to: email,
      subject: "New Task added",
      text: `
          Hey new task added to you Todo list here is a detail of it
          ${content} , it a ${priority} priority task.
        `,
    };
    const info = await transporter.sendMail(notification);
  } catch (error) {
    console.log(error);
  }
};

const newPost = async (req, res, next) => {
  try {
    const { email, user_id, heading, content, priority } = req.body;
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

    await sendEmail(email, content, priority);

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

//
//
