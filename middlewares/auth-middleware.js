import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token not provided" });
    }

    const jwtToken = token.replace("Bearer ", "").trim();
    console.log("Token received:", jwtToken);

    try {
      const isDecoded = jwt.verify(jwtToken, process.env.JWT_SECTECT_KEY);
      console.log("Decoded Token:", isDecoded);

      const userData = await User.findOne({ email: isDecoded.email }).select({
        password: 0,
      });

      console.log("Decoded JWT Data:", userData);

      req.user = userData;
      req.token = token;
      req.userID = userData._id;
     
    } catch (e) {
      console.log("JWT decoding error:", e);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    next();

  } catch (e) {
    console.log("Error from auth middleware:", e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export default authMiddleware;
