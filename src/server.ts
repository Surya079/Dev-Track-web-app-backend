import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDatabase } from "./db/mongo";
import AuthRouter from "../src/routes/auth";
import ProjectRouter from "../src/routes/project";
import TaskRouter from "../src/routes/task";

dotenv.config();
const app: Application = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
connectDatabase(); //connecting Database

//Actual API's

app.use("/api/auth", AuthRouter);
app.use("/api/projects", ProjectRouter);
app.use("/api/tasks", TaskRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("DevTrack API is running 🚀");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
