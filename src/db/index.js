import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import dotenv from "dotenv";
dotenv.config({
    path: "../.env"
});

export const connectDB = async () => {
  try {
    const connectionInstance =await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    console.log("Database connected",` host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }

};
