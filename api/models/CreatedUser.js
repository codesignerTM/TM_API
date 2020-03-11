import mongoose from "mongoose";
let Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    userName: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    tasks: { type: Array, default: [] },
    storeTime: { type: String, required: true }
  },
  {
    collection: "User"
  }
);

let model = mongoose.model("User", UserSchema);
export default model;
