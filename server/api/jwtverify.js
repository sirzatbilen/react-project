const jwt = require("jsonwebtoken");

function VerifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "giriş yapmanız gerekiyor" });
  }
  try {
    const decoded = jwt.verify(token, "ssh");
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(400).json({ message: "token geeçersizdir" });
    }
  } catch (error) {
    return res.status(401).json({ message: "token geeçersizdir" });
  }
}

module.exports = VerifyToken;
