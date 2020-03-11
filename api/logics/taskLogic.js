import dataResponse from "../models/DataResponse";
import User from "../models/CreatedUser";
import nanoid from "nanoid";

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
        taskId: nanoid()
      };

      taskArray.push(taskData);

      let updatedUser = await this.updateUserWithTask(userId, taskArray);

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
    let userId = req.params.user_id;
    let taskId = req.params.task_id;

    if (!userId || !taskId) {
      return new dataResponse(
        dataResponse.dataResponseType.FAILED,
        "cannot perform operation"
      );
    }

    try {
      let user = await User.findById({ _id: userId });

      let taskArray = user.tasks;
      taskArray.map(task => {
        if (task.taskId === taskId) {
          task.name = req.body.name;
        }
        return task;
      });

      let updatedUser = await this.updateUserWithTask(userId, taskArray);

      return new dataResponse(
        dataResponse.dataResponseType.SUCCESS,
        "Task updated"
      );
    } catch (error) {
      console.log(error, "error during task update");
      return new dataResponse(
        dataResponse.dataResponseType.FAILED,
        "error during task update"
      );
    }
  }

  static async updateUserWithTask(userId, taskArray) {
    try {
      let updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { tasks: taskArray },
        {
          useFindAndModify: false
        }
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
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
    let id = req.params.user_id;
    try {
      let user = await User.findById({ _id: id });

      return new dataResponse(
        dataResponse.dataResponseType.SUCCESS,
        user.tasks
      );
    } catch (error) {
      console.log(error, "error during loading user tasks");
      return new dataResponse(
        dataResponse.dataResponseType.FAILED,
        "error during loading user task"
      );
    }
  }
}

export default TaskLogic;
