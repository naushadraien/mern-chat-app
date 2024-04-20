import express from "express";
import {
  getAllUsersExcludingLoggedInUser,
  loginuser,
  logOutUser,
  registerUser,
} from "../controllers/auth.js";
import { authenticateUser } from "../utils/authenticateUser.js";

const app = express.Router();

app.get("/users", authenticateUser, getAllUsersExcludingLoggedInUser);
app.get("/logout", logOutUser);
app.post("/register", registerUser);
app.post("/login", loginuser);

export default app;
