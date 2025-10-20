import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
console.log(process.env.MONGO_URI);

export const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // Exit process if DB fails to connect
  }
};

// export const connectDatabase = mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.log("MongoDB connection error:", err));
