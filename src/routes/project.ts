import express from "express";
import {
  handleCreateProject,
  handleGetProject,
  handleGetProjectById,
  handleUpdateProject,
} from "../controller/projectController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Register

router.post("/create-project", authenticate, handleCreateProject);
router.get("/get-projects", authenticate, handleGetProject);
router.get("/get-user-project/", authenticate, handleGetProjectById);
router.put("/update-project/:id", authenticate, handleUpdateProject);

export default router;
