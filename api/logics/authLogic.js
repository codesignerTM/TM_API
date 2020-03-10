import dataResponse from "../models/DataResponse";
import AppUser from "../models/AppUser";
import bcrypt from "bcrypt";
import moment from "moment";
import jwt from "jsonwebtoken";

class AuthLogic {
  static async signUp(req) {
    try {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      let password = req.body.password;
      let hash = await bcrypt.hash(password, salt);

      let user = new AppUser({
        userName: req.body.fullName,
        userEmail: req.body.email,
        userPassword: hash,
        storeTime: moment().format("YYYY-MM-DD")
      });

      user.save();

      let userData = {
        userName: req.body.fullName,
        userEmail: req.body.email
      };

      let userResposeData = await this.createUserToken(userData);

      return new dataResponse(
        dataResponse.dataResponseType.SUCCESS,
        userResposeData
      );
    } catch (error) {
      console.log(error, "error during signup");
      return new dataResponse(
        dataResponse.dataResponseType.FAILED,
        "signUp unsuccessful"
      );
    }
  }

  static async createUserToken(userData) {
    let token = jwt.sign(userData, process.env.JWT_KEY, {
      expiresIn: "7d"
    });

    let expireDate = moment().add(7, "days");

    return {
      userEmail: userData.userEmail,
      userName: userData.userName,
      token: token,
      expire: expireDate
    };
  }

  static async logIn(req) {
    return new dataResponse(dataResponse.dataResponseType.SUCCESS, "logIn");
  }

  static async resetPassword(req) {
    return new dataResponse(
      dataResponse.dataResponseType.SUCCESS,
      "resetPassword"
    );
  }
}

export default AuthLogic;
