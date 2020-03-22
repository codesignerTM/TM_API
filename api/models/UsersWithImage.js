import mongoose from "mongoose";
let Schema = mongoose.Schema;

let ImageUserSchema = new Schema(
  {
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true },
    image: { type: Buffer, contentType: String, required: true },
    storeTime: { type: String, default: Date.now(), required: true }
  },
  {
    collection: "ImageUser"
  }
);

let model = mongoose.model("ImageUser", ImageUserSchema);
export default model;
