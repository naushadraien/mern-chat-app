import jwt from "jsonwebtoken";
import chatConfig from "../config/index.js";
import { Response } from "express";
export const generateToken = (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, chatConfig.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: chatConfig.NODE_ENV !== "development", // true in production false in development
  });
};
