import authController from "../controllers/auth";

export default app => {
  app.post("/signup", async function(req, res, next) {
    await authController.signUp(req, res);
  });

  app.post("/login", async function(req, res, next) {
    await authController.logIn(req, res);
  });

  app.post("/resetpwd", async function(req, res, next) {
    await authController.resetPassword(req, res);
  });
};
