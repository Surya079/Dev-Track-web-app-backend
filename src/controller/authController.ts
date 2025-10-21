import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import dotenv from "dotenv";

dotenv.config();
export const handleRegisster = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      message: "User registered Successfully",
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      messsage: "Internal Server Error while register",
      error: error?.messsage,
    });
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const JWT_KEY = process.env.SECRET_KEY as string;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login Successfully",
      user: user,
      token: token,
    });
  } catch (error: any) {
    console.log(error.message);

    res.status(500).json({
      message: "Internal Server Error while login",
      error: error.message,
    });
  }
};
