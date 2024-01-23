import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./locker.env" });

const uri = process.env.DATA_BASE;
const db = await mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected"));

export default db;
