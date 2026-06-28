import mongoose from "mongoose";
import { DB_URL } from "./serverConfig.js";

export async function connectDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log("DB connected!!!");
  } catch (error) {
    console.log("Error connecting DB!!!", error);
    process.exit(1);
  }
}
