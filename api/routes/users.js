import userController from "../controllers/users";

export default app => {
  app.post("/users", async function(req, res, next) {
    await userController.createUser(req, res);
  });

  app.put("/users/:id", async function(req, res, next) {
    await userController.updateUser(req, res);
  });

  app.get("/users", async function(req, res, next) {
    await userController.listAllUsers(req, res);
  });

  app.get("/users/:id", async function(req, res, next) {
    await userController.getUserInfo(req, res);
  });
};
