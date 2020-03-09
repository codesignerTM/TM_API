import Intl from "intl";

class DataResponse {
  constructor(ResponseStatus, ResponseData, ResponseCreated) {
    if (!ResponseCreated || ResponseCreated === null) {
      let date = new Date();
      ResponseCreated = new Intl.DateTimeFormat("en-US").format(date);
    }

    this.ResponseCreated = ResponseCreated;
    this.ResponseStatus = ResponseStatus;
    this.ResponseData = ResponseData;
  }
}

module.exports = DataResponse;

module.exports.dataResponseType = {
  SUCCESS: "success",
  FAILED: "failed",
  ERRORED: "errored",
  INVALID: "invalid"
};
