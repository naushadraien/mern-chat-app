import jwt from "jsonwebtoken";
import chatConfig from "../config/index.js";
import { TryCatch } from "../middlewares/errorMiddleware.js";
import ErrorHandler from "./utility-Class.js";
import User from "../models/User.js";
export const authenticateUser = TryCatch(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(new ErrorHandler("Please login first", 400));
    }
    const decodedUser = jwt.verify(token, chatConfig.JWT_SECRET);
    req.user = (await User.findById(decodedUser.userId));
    next();
});
