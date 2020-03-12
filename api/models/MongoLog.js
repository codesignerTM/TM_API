import mongoose from "mongoose";
let Schema = mongoose.Schema;

let MongoLogSchema = new Schema(
  {
    logTitle: { type: String, required: true, default: "" },
    logLevel: { type: String, default: 1 },
    logOwner: { type: String, required: false, default: "" },
    logType: { type: String, default: 1 },
    logDataObj: { type: Object, default: {} },
    creationDate: { type: Date, default: Date.now }
  },
  {
    collection: "MongoLogs"
  }
);

let model = mongoose.model("MongoLogs", MongoLogSchema);
export default model;
