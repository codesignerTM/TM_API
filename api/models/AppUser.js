import mongoose from "mongoose";
let Schema = mongoose.Schema;

let AppUserSchema = new Schema(
  {
    userEmail: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true },
    userName: { type: String, required: true },
    storeTime: { type: String, required: true }
  },
  {
    collection: "AppUser"
  }
);

let model = mongoose.model("AppUser", AppUserSchema);
export default model;
