import { Task } from "../models/taskModel.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
      message: "Tasks fetched",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error while fetching tasks",
    });
  }
};

export const createTask = async (req, res) => {
  try {
    console.log(req.body);
    const { title, description } = req.body;

    //validation
    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Task title is required!",
      });
    }
    if (!description || description.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Task description is required!",
      });
    }
    const task = await Task.create({
      title: title.trim(),
      description: description,
    });

    return res.status(201).json({
      success: true,
      data: task,
      message: "Task created",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error while creating task!",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found!",
      });
    }

    // Update operational fields
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true },
    );

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error while updating task!",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found!",
      });
    }

    await task.deleteOne();

    return res.status(200).json({
      success: true,
      data: {},
      message: "Task deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error while deleting task!",
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
      message: "Task fetched",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error while fetching task!",
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { isCompleted } = req.body;
    const { id } = req.params;
    const newStatus = isCompleted ? "Completed" : "Pending";
    const task = await Task.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true, runValidators: true },
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Task status updated to ${newStatus}`,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error while updating status.",
    });
  }
};
