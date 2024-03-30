import userModel from "../../../db/models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signinSchema, signupSchema } from "./auth.validation.js";
import SendEmail from "../../utils/sendEmail.js";

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
  const token = await jwt.sign({ email }, process.env.CONFIRMEMAILTOKEN,{expiresIn:'1h'});
  const refresToken = await jwt.sign({ email }, process.env.CONFIRMEMAILTOKEN, {expiresIn:'1d'});
  const html = `
  <h2>Infinity Light</h2>
  <p>Welcome ${userName}</p>
  <a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}'>Confirm Email</a>
  <br/>
  <a href='http://localhost:4000/auth/newConfirmEmail/${refresToken}'>Resend Confirm Email</a>
  `;
   
  await SendEmail(email, 'Welcome Message', html);
  return res.status(201).json({ message: "success", newUser });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("userName password confirmEmail");
  if (!user) {
    return res.json({ message: "email is not exist" });
  }
  if(!user.confirmEmail){
    return res.json({ message: "please confirm your email" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.json({ message: "invalid password" });
  }
  const token = jwt.sign({ id: user._id }, process.env.LOGINSIG);
  return res.json({ message: "success", token });
};

export const confirmEmail = async (req, res) => {
    const { token } = req.params;
    const decoded = await jwt.verify(token, process.env.CONFIRMEMAILTOKEN);
    const user = await userModel.updateOne({ email: decoded.email },{confirmEmail:true},{new:true});
    if(user.modifiedCount > 0){
        return res.json({message:"success"})
    }
  }
