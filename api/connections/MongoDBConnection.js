import mongoose from "mongoose";

module.exports.createConnection = () => {
  return mongoose.connect(process.env.MONGOCONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  });
};
