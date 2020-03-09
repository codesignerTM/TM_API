import dataResponse from "../models/DataResponse";

class AuthLogic {
  static async signUp(req) {
    return new dataResponse(dataResponse.dataResponseType.SUCCESS, "signUp");
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
