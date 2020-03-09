import userRoutes from "./users";
import authRoutes from "./auth";
import taskRoutes from "./task";

module.exports.register = app => {
  //public routes
  userRoutes(app);
  authRoutes(app);
  taskRoutes(app);
};
