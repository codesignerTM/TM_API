import dataResponse from "../models/DataResponse";
import AppUser from "../models/AppUser";
import bcrypt from "bcrypt";
import moment from "moment";
import jwt from "jsonwebtoken";
import EmailHelper from "../helpers/EmailHelper";
import RandomCharGenerator from "../helpers/RandomCharGen";

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
    try {
      let appUser = await AppUser.find({ userEmail: req.body.email });

      if (appUser.length === 0)
        return new dataResponse(
          dataResponse.dataResponseType.INVALID,
          "Authentication failed!"
        );

      let password = appUser[0].userPassword;

      let comparaPWD = bcrypt.compareSync(req.body.password, password);

      if (!comparaPWD)
        return new dataResponse(
          dataResponse.dataResponseType.INVALID,
          "Authentication failed!"
        );

      let userData = {
        userName: appUser.fullName,
        userEmail: appUser.email
      };

      let userResposeData = await this.createUserToken(userData);

      return new dataResponse(
        dataResponse.dataResponseType.SUCCESS,
        userResposeData
      );
    } catch (error) {
      console.log(error, "error during login");
      return new dataResponse(
        dataResponse.dataResponseType.FAILED,
        "login unsuccessful"
      );
    }
  }

  static async resetPassword(req) {
    try {
      let email = req.body.email || false;
      console.log("appUser", appUser);

      if (!email) return new dataResponse(dataResponse.dataResponseType.FAILED);

      let appUser = await AppUser.find({ userEmail: req.body.email });
      console.log("appUser", appUser);

      if (appUser.length === 0)
        return new dataResponse(
          dataResponse.dataResponseType.INVALID,
          "Authentication failed!"
        );

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      let newPassword = await RandomCharGenerator.RandomCharGenerator(6);
      let newHashedPassword = bcrypt.hashSync(newPassword, salt);

      await AppUser.findOneAndUpdate(
        { _id: appUser._id },
        { userPassword: newHashedPassword },
        { new: true }
      );

      await this.sendPasswordResetEmail(appUser, newPassword);

      return new dataResponse(
        dataResponse.dataResponseType.SUCCESS,
        "Password Reset email sent!"
      );
    } catch (error) {
      console.log(error, "error during password reset");
      return new dataResponse(
        dataResponse.dataResponseType.FAILED,
        "password reset unsuccessful"
      );
    }
  }

  static async sendPasswordResetEmail(appUser, newPassword) {
    let emailHelper = new EmailHelper();

    return await emailHelper.sendEmail();
  }
}

export default AuthLogic;
