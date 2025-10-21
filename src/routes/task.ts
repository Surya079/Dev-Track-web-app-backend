import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import {
  handleCreateTask,
  handleDeleteTask,
  handleGetTasks,
  handleUpdateTask,
} from "../controller/taskController";

const router = express.Router();

// Register

router.post("/create-task", authenticate, handleCreateTask);
router.get("/get-tasks/:id", authenticate, handleGetTasks);
router.put("/update-task/:id", authenticate, handleUpdateTask);
router.delete("/delete-task/:id", authenticate, handleDeleteTask);

export default router;
