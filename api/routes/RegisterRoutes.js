import userRoutes from "./users";
import authRoutes from "./auth";
import taskRoutes from "./task";
import streamRoutes from "./streams";

module.exports.register = app => {
  //public routes
  userRoutes(app);
  authRoutes(app);
  taskRoutes(app);
  streamRoutes(app);
};
