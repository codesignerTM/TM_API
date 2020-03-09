import dataResponse from "../models/DataResponse";

class TaskLogic {
  static async createTask(req) {
    return new dataResponse(
      dataResponse.dataResponseType.SUCCESS,
      "Task created"
    );
  }

  static async updateTask(req) {
    return new dataResponse(
      dataResponse.dataResponseType.SUCCESS,
      "updateTask"
    );
  }

  static async deleteTask(req) {
    return new dataResponse(
      dataResponse.dataResponseType.SUCCESS,
      "deleteTask"
    );
  }

  static async getTask(req) {
    return new dataResponse(dataResponse.dataResponseType.SUCCESS, "getTask");
  }

  static async getAllTask(req) {
    return new dataResponse(
      dataResponse.dataResponseType.SUCCESS,
      "getAllTask"
    );
  }
}

export default TaskLogic;
