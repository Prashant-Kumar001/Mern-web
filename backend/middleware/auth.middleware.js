import jwt from "jsonwebtoken";
import { config } from "dotenv";
import userModel from "../model/user.model.js";
config();
export const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing or invalid" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const isUser = await userModel.findOne({ email: decoded.email });
    req.user = decoded;
    next();
  } catch (error) {
    console.log('hello world!', error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
