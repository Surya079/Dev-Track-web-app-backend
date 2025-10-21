import express from "express";
import { handleLogin, handleRegisster } from "../controller/authController";

const router = express.Router();

// Register

router.post("/register/user", handleRegisster);
router.post("/login/user", handleLogin);

export default router;
