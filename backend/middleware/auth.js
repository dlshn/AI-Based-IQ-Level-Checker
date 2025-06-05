// Google and jwt tokens flexible middleware


import jwt from "jsonwebtoken";
import admin from "../firebaseAdmin.js";

export const verifyAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Access denied. Token missing." });
  }

  try {
    // Try verifying as your JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.authType = "jwt";
    return next();
  } catch (err) {
    // If failed, try verifying as Google token
    try {
      const decoded = await admin.auth().verifyIdToken(token); 
      req.user = decoded;
      req.authType = "google";

      return next();
    } catch (e) {
      return res.status(403).json({ msg: "Invalid or expired token." });
    }
  }
};
