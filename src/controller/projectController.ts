import { Response, Request } from "express";
import { Project } from "../models/Project";

export const handleCreateProject = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server error while create project",
    });
  }
};
