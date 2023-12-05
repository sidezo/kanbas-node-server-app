import shcema from "./schema.js";
import mongoose from "mongoose";
const model = mongoose.model("users", shcema); //inforce all the restrictions in the schema 
export default model;

model.delete