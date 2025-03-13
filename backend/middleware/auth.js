import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Extract Bearer token

  if (!token) {
    return res.json({
      success: false,
      message: "NOT AUTHORIZED, LOGIN AGAIN!",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id; // Ensure token has 'id'
    next();
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Invalid Token. Login again." });
  }
};

export default authUser;

