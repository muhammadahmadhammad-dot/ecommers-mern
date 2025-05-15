import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .send({ success: false, message: "Not Authenticated" });
  }

  const token = authorization.split(" ")[1];
  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ success: false, message: "Invalid Token" });
    }
    const user = await userModel.findOne({ _id: decoded.id });
    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "User Not Found" });
    }
    user.password = undefined;
    req.user =user;
    next();
  });
};
export default authMiddleware