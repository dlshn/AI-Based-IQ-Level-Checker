import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Access denied. Please log in." }); 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user)
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Session expired or invalid. Please sign in again." });
  }
};

