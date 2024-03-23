import userModel from "../../../db/models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signinSchema, signupSchema } from "./auth.validation.js";

export const signup = async (req, res) => {
  const { userName, email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "email already exist" });
  }
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALTROUND)
  );
  const newUser = await userModel.create({
    userName,
    email,
    password: hashedPassword,
  });
  if (!newUser) {
    return res.json({ message: "error while creating user" });
  }
  return res.status(201).json({ message: "success", newUser });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("userName password");
  if (!user) {
    return res.json({ message: "email is not exist" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.json({ message: "invalid password" });
  }
  const token = jwt.sign({ id: user._id }, process.env.LOGINSIG);
  return res.json({ message: "success", token });
};
