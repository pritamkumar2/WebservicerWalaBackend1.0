import mongoose from "mongoose";
import dotenv from "dotenv";
// Error middleware should be used before your routes
dotenv.config({ path: "./locker.env" });

const uri = process.env.DATA_BASE;
const db =  await mongoose.connect(uri).then(() => console.log("dataBase Connected!"));

export default db