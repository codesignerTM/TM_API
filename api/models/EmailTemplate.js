import mongoose from "mongoose";
let Schema = mongoose.Schema;

let EmailTemplateSchema = new Schema(
  {
    emailCustomName: { type: String, required: true, unique: true },
    emailSubject: { type: String, required: false },
    emailContent: { type: String, required: true },
    status: { type: Number, required: true, default: 0 },
    creationDate: { type: Date, default: Date.now }
  },
  {
    collection: "EmailTemplate"
  }
);

let model = mongoose.model("EmailTemplate", EmailTemplateSchema);
export default model;
