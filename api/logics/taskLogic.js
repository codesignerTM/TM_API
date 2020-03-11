import dataResponse from "../models/DataResponse";
import User from "../models/CreatedUser";
import mongoose from "mongoose";
class TaskLogic {
  static async createTaskForUser(req) {
    let userId = req.params.id;
    try {
      let user = await User.findById({ _id: userId });

      if (!user) {
        return new dataResponse(
          dataResponse.dataResponseType.FAILED,
          "user not found"
        );
      }

      let taskArray = user.tasks;

      let taskData = {
        name: req.body.name,
        description: req.body.description,
        date_time: req.body.date_time,
        taskId: (taskArray.length + 1).toString()
      };

      taskArray.push(taskData);

      let updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { tasks: taskArray },
        {
          useFindAndModify: false
        }
      );

      return new dataResponse(
        dataResponse.dataResponseType.SUCCESS,
        "Task added to user"
      );
    } catch (error) {
      console.log(error, "error during task creation");
      return new dataResponse(
        dataResponse.dataResponseType.FAILED,
        "error during task creation"
      );
    }
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
