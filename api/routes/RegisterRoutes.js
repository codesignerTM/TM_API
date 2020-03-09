import userRoutes from "./users";
import authRoutes from "./auth";

module.exports.register = app => {
  //public routes
  userRoutes(app);
  authRoutes(app);
};
