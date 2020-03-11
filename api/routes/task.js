import taskController from "../controllers/task";

export default app => {
  app.post("/users/:id/tasks", async function(req, res, next) {
    await taskController.createTask(req, res);
  });

  app.put("/users/:user_id/tasks/:task_id", async function(req, res, next) {
    await taskController.updateTask(req, res);
  });

  app.delete("/users/:user_id/tasks/:task_id", async function(req, res, next) {
    await taskController.deleteTask(req, res);
  });

  app.get("/users/:user_id/tasks/:task_id", async function(req, res, next) {
    await taskController.getTask(req, res);
  });

  app.get("/users/:user_id/tasks", async function(req, res, next) {
    await taskController.getAllTask(req, res);
  });
};
