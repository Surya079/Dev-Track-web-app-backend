import { Response, Request } from "express";
import { Project } from "../models/Project";
import { AuthRequest } from "../middleware/authMiddleware";

export const handleCreateProject = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const project = await Project.create({
      title,
      description,
      userId: req.user?.id as string,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server error while create project",
    });
  }
};

export const handleGetProject = async (req: AuthRequest, res: Response) => {
  try {
    const projects = await Project.find();

    res.status(200).json({
      message: "project fetched successfully",
      projects,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server error while getting project",
    });
  }
};

export const handleGetProjectById = async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.find({ userId: req?.user?.id });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }
    res.status(200).json({
      message: "Project fectched",
      project,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server error while getting project by id",
    });
  }
};

export const handleUpdateProject = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      { _id: req.params.id, userId: req?.user?.id },
      { title, description },
      { new: true }
    );

    if (!updatedProject)
      return res.status(404).json({ message: "Project not found" });
    res.status(200).json({
      message: "Project update successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server error while update project",
    });
  }
};
