import userController from "../controllers/auth";

module.exports = function(app) {
  app.get("/users", function(req, res, next) {
    res.send("users");
  });
};
