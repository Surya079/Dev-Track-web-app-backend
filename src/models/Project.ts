import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  description?: string;
  userId: mongoose.Types.ObjectId;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>("Project", projectSchema);
