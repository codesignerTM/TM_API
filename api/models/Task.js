import mongoose from "mongoose";
let Schema = mongoose.Schema;

let TaskSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    date_time: { type: Date, required: true }
  },
  {
    collection: "Task"
  }
);

let model = mongoose.model("Task", TaskSchema);
export default model;
