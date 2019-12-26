import mongoose from "mongoose";
import { mongodbUri } from "./config";

console.log(process.env.NODE_ENV)
const uri = mongodbUri[process.env.NODE_ENV];

if (!uri || uri.length === 0) throw new Error("Undefined node environment");

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", e =>
  console.error("MongoDB connection error.", e.toString())
);

export default mongoose;
