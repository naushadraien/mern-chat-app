import userRoutes from "./userRoutes.js";
import messageRoutes from "./messageRoutes.js";
const baseRouter = "/api/v1";
const mainRouter = (app) => {
    app.use(`${baseRouter}/auth`, userRoutes);
    app.use(`${baseRouter}/message`, messageRoutes);
};
export default mainRouter;
