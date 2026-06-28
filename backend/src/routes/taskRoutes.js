import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateStatus,
  updateTask,
} from "../controllers/taskController.js";
const router = express.Router();

router.route("/").get(getTasks).post(createTask);

router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

router.patch("/status/:id", updateStatus);

export default router;
