import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Authentication failed: Token missing" });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer "

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", decoded); // Debugging

    if (!decoded.isAdmin) {
      return res.status(403).json({ success: false, message: "Access Denied: Not an Admin" });
    }

    req.user = decoded;
    next();
  } catch (e) {
    console.log("JWT Error:", e.message);
    res.status(401).json({ success: false, message: "Authentication failed: Invalid token" });
  }
};

export default adminAuth;
