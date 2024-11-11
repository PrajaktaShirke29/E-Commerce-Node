import expressAsyncHandler from "express-async-handler";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const registerUserCtrl = expressAsyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) throw new Error("User already exists");
  // res.json({
  //   msg: "User already exists",
  // });
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    status: "success",
    message: "User added successfully",
    data: user,
  });
});

export const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });
  // check password
  if (userExist && (await bcrypt.compare(password, userExist?.password)))
    return res.json({
      msg: "login Successfull",
      user: userExist,
      token: generateToken(userExist?._id),
    });

  throw new Error("Invalid login details");
  // return res.json({ msg: "Invalid login details" });
});

export const getUserProfileCtrl = expressAsyncHandler(async (req, res) => {
  const token = getTokenFromHeader(req);
  const verified = verifyToken(token);
  if (verified) {
    return res.json({ msg: "verified" });
  }
  res.json({
    msg: "Welcome on profile page",
  });
});
