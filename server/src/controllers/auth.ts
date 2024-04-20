import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/errorMiddleware.js";
import ErrorHandler from "../utils/utility-Class.js";
import { CustomRequest, UserSignUpType, UserType } from "../types/types.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { errorMessage, successData } from "../utils/utitlity-func.js";

export const registerUser = TryCatch(
  async (req: Request<{}, {}, UserSignUpType>, res, next) => {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return errorMessage(next, "All fields are required", 400);
    }
    if (password !== confirmPassword) {
      return errorMessage(next, "Password doesn't match", 400);
    }

    const user = await User.findOne({ userName });
    if (user) {
      return errorMessage(next, "User with this username already exists", 400);
    }

    const boyImage = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlImage = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      fullName,
      userName,
      password: hashedPassword,
      imageUrl: gender === "male" ? boyImage : girlImage,
      gender,
    });

    generateToken(res, newUser._id);

    return successData(res, "User Created Successfully", newUser, true);
  }
);

export const loginuser = TryCatch(async (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return errorMessage(next, "All fields are required", 400);
  }
  const user = await User.findOne({ userName });
  if (!user) {
    return errorMessage(next, "Invalid credentials!", 401);
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return errorMessage(next, "Invalid credentials!", 401);
  }
  generateToken(res, user._id);
  return successData(res, "Logged in user successfully", user);
});

export const logOutUser = (req: Request, res: Response, next: NextFunction) => {
  return res
    .cookie("token", "", {
      maxAge: 0,
    })
    .status(200)
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

export const getAllUsersExcludingLoggedInUser = TryCatch(
  async (req: CustomRequest<UserType>, res, next) => {
    const loggedInUser = req.user?._id;
    const users = await User.find({
      _id: {
        $ne: loggedInUser,
      },
    }).select("-password");
    if (!users) {
      return errorMessage(next, "User not found", 404);
    }

    return successData(res, "", users);
  }
);
