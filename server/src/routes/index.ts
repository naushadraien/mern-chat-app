import { type Application } from "express";
import userRoutes from "./userRoutes.js";
import messageRoutes from "./messageRoutes.js";
const baseRouter = "/api/v1";
const mainRouter = (app: Application) => {
  app.use(`${baseRouter}/auth`, userRoutes);
  app.use(`${baseRouter}/message`, messageRoutes);
};

export default mainRouter;
