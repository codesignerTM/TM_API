import dataResponse from "../models/DataResponse";
import AppUser from "../models/AppUser";
import bcrypt from "bcrypt";

class AuthLogic {
  static async signUp(req) {
    console.log("req", req);
    try {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      let password = req.body.password;
      let hash = await bcrypt.hash(password, salt);

      let user = new AppUser({
        userName: req.body.fullName,
        userEmail: req.body.email,
        userPassword: hash
      });

      user.save();
      return new dataResponse(
        dataResponse.dataResponseType.SUCCESS,
        "signUp successful"
      );
    } catch (error) {
      console.log(error, "error during signup");
      return new dataResponse(
        dataResponse.dataResponseType.FAILED,
        "signUp unsuccessful"
      );
    }
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
