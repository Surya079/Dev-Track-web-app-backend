import mongoose, { Document, mongo, Schema } from "mongoose";

export type statusType = "To Do" | "In Progress" | "Done";

export interface ITask extends Document {
  title: string;
  comments: string;
  dueDate: Date;
  status: statusType;
  projectId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    comments: { type: String, required: true },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
    },
    dueDate: { type: Date, required: true },
    projectId: { type: Schema.Types.ObjectId, required: true, ref: "Project" },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "Task" },
  },
  { timestamps: true }
);

export const Task = mongoose.model<ITask>("Task", taskSchema);
