import userRoutes from "./users";
import authRoutes from "./auth";
import taskRoutes from "./task";
import streamRoutes from "./streams";
import exportRoutes from "./export";

module.exports.register = app => {
  //public routes
  userRoutes(app);
  authRoutes(app);
  taskRoutes(app);
  streamRoutes(app);
  exportRoutes(app);
};
