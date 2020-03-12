import dataResponse from "../models/DataResponse";
import User from "../models/CreatedUser";
import nanoid from "nanoid";
import moment from "moment";

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
      let defaultStatus = "pending";

      let taskData = {
        name: req.body.name,
        status: defaultStatus,
        description: req.body.description,
        date_time: req.body.date_time,
        deadline: req.body.deadline,
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
    let userId = req.params.user_id;
    let taskId = req.params.task_id;

    try {
      let user = await User.findById({ _id: userId });
      let tasksByUser = user.tasks;
      let tasksArray = tasksByUser.filter(task => task.taskId !== taskId);
      console.log(tasksArray, "tasksArray");

      let updatedUser = await this.updateUserWithTask(userId, tasksArray);

      return new dataResponse(
        dataResponse.dataResponseType.SUCCESS,
        "Task deleted"
      );
    } catch (error) {}
    return new dataResponse(
      dataResponse.dataResponseType.SUCCESS,
      "deleteTask"
    );
  }

  static async getTask(req) {
    let userId = req.params.user_id;
    let taskId = req.params.task_id;

    try {
      let user = await User.findById({ _id: userId });
      let tasksByUser = user.tasks;
      let task = tasksByUser.find(task => task.taskId === taskId);
      if (task) {
        return new dataResponse(dataResponse.dataResponseType.SUCCESS, task);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error, "error during loading task");
      return new dataResponse(
        dataResponse.dataResponseType.FAILED,
        "task not found"
      );
    }
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

  static async resetTaskStatus() {
    let allUsers = await User.find();
    let now = moment();
    let pendingStatus = "pending";

    for (let key in allUsers) {
      let selectedUser = allUsers[key];
      let userTasks = allUsers[key].tasks;
      userTasks.map(async task => {
        if (task.status === pendingStatus && moment(task.deadline) < now) {
          let index = userTasks.indexOf(task);
          let fieldToUpdate = `tasks.${index}.status`;

          let updatedUser = await User.update(
            { _id: selectedUser._id },
            {
              $set: {
                [fieldToUpdate]: "done"
              }
            },
            {
              useFindAndModify: false
            }
          );
        }
        return task;
      });
    }
  }
}

export default TaskLogic;
