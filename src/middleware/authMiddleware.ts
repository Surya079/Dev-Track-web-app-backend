import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req?.headers?.authorization as string;
//   console.log(authHeader);

  if (!authHeader) {
    return res.status(400).json({
      message: "No Token Provided ",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({
      message: "No Token Provided ",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as {
      id: string;
      email: string;
    };

    req.user = decoded;
    return next();
  } catch (error: any) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
