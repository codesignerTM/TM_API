import dataResponse from "../models/DataResponse";
import User from "../models/CreatedUser";
import moment from "moment";

class UserLogic {
  static async createUser(req) {
    try {
      let createdUser = new User({
        userName: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        isActive: true,
        storeTime: moment()
      });
      createdUser.save();

      return new dataResponse(
        dataResponse.dataResponseType.SUCCESS,
        createdUser
      );
    } catch (error) {
      console.log(error, "error during user creation");
      return new dataResponse(
        dataResponse.dataResponseType.FAILED,
        "error during user creation"
      );
    }
  }

  static async updateUser(req) {
    let id = req.params.id;
    try {
      let userToUpdate = await User.findOneAndUpdate(
        { _id: id },
        { first_name: req.body.first_name, last_name: req.body.last_name },
        { new: true }
      );

      return new dataResponse(
        dataResponse.dataResponseType.SUCCESS,
        userToUpdate
      );
    } catch (error) {
      console.log(error, "error during user update");
      return new dataResponse(
        dataResponse.dataResponseType.FAILED,
        "error during user update"
      );
    }
  }

  static async listAllUsers() {
    try {
      let users = await User.find();
      return new dataResponse(dataResponse.dataResponseType.SUCCESS, users);
    } catch (error) {
      console.log(error, "error during loading users");
      return new dataResponse(
        dataResponse.dataResponseType.FAILED,
        "error during loading users"
      );
    }
  }

  static async getUserInfo(req) {
    let id = req.params.id;
    try {
      let user = await User.findById({ _id: id });
      return new dataResponse(dataResponse.dataResponseType.SUCCESS, user);
    } catch (error) {
      console.log(error, "error during loading users");
      return new dataResponse(
        dataResponse.dataResponseType.FAILED,
        "error during loading users"
      );
    }
  }
}

export default UserLogic;
