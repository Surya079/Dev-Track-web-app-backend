import { AuthRequest } from "../middleware/authMiddleware";
import { Response } from "express";
import { Task } from "../models/Task";

export const handleCreateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, comments, projectId, dueDate } = req.body;

    if (!title || !comments) {
      return res.status(400).json({
        message: "All fileds are required",
      });
    }

    const computedDueDate = dueDate
      ? new Date(dueDate)
      : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

    const task = await Task.create({
      title,
      comments,
      status: "To Do",
      projectId,
      dueDate: computedDueDate,
      userId: req.user?.id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error while create task",
      error: error?.message,
    });
  }
};

export const handleGetTasks = async (req: AuthRequest, res: Response) => {
  try {
    const projectId = req.params.id as string;
    const tasks = await Task.find({ projectId });

    if (!tasks) {
      return res.status(404).json({
        message: "Tasks not found",
      });
    }

    res.status(200).json({
      message: "Tasks fectched successfully",
      tasks,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server error while getting tasks",
      error: error?.message,
    });
  }
};

export const handleGetTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const projectId = req.params.id;

    const task = await Task.find({
      userId,
      projectId,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server error while getting task by id",
      error: error?.message,
    });
  }
};

// export const handleGetTaskById = async (req: AuthRequest, res: Response) => {
//   try {
//     const task = await Task.find({ userId: req?.user?.id });

//     if (!task) {
//       return res.status(404).json({
//         message: "task not found",
//       });
//     }
//     res.status(200).json({
//       message: "task fectched",
//       task,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       message: "Internal Server error while getting task by id",
//     });
//   }
// };

export const handleUpdateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, comments, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      { _id: req.params.id, userId: req.user?.id },
      { title, comments, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      updatedTask,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server error while updateing task",
    });
  }
};

// Delete task
export const handleDeleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete({ _id: req.params.id });
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.json({ message: "Task deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
