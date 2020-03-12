import dataResponse from "../models/DataResponse";
import AppUser from "../models/AppUser";
import MongoLog from "../models/MongoLog";
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

      let mongoLog = new MongoLog({
        logTitle: "signUp successfull",
        logLevel: 1,
        logOwner: "admin",
        logType: 1,
        logDataObj: req.body.fullName
      });
      await mongoLog.save();

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

      if (!email) return new dataResponse(dataResponse.dataResponseType.FAILED);

      let appUser = await AppUser.find({ userEmail: req.body.email });

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
        { _id: appUser[0]._id },
        { userPassword: newHashedPassword },
        {
          useFindAndModify: false
        }
      );

      await this.sendPasswordResetEmail(appUser, newPassword);
      return new dataResponse(
        dataResponse.dataResponseType.SUCCESS,
        "password reset email sent"
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
    try {
      let emailHelper = new EmailHelper();
      let emailTemplateName = "password-reset";
      let sender = "Black Swan HR";

      let emailTemplate = await EmailHelper.getEmailTemplate(emailTemplateName);

      let replacedEmailContent = await EmailHelper.changeEmailTemplateContent(
        emailTemplate[0].emailContent,
        appUser[0].userName,
        newPassword,
        sender
      );

      let mailOptions = {
        from: process.env.GMAIL_ACC,
        to: appUser[0].userEmail,
        subject: emailTemplate[0].emailSubject,
        text: replacedEmailContent
      };

      console.log("mailOptions", mailOptions);

      let mongoLog = new MongoLog({
        logTitle: "password reset email sent",
        logLevel: 1,
        logOwner: "admin",
        logType: 1,
        logDataObj: appUser.userName
      });
      await mongoLog.save();

      return await emailHelper.sendEmail(mailOptions);
    } catch (error) {
      console.log(error, "error during password reset");
      return new dataResponse(
        dataResponse.dataResponseType.FAILED,
        "password reset unsuccessful"
      );
    }
  }
}

export default AuthLogic;
