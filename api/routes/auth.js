import authController from "../controllers/auth";

module.exports = function(app) {
  app.get("/hello", function(req, res, next) {
    res.send("hello");
  });
};
