import authController from "../controllers/auth";

export default app => {
  app.get("/hello", async function(req, res, next) {
    await authController.signUp(req, res);
  });
};
