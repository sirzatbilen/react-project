const router = require("express").Router();
const User = require("../Users/users-model");
const mw = require("./auth-middleware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post(
  "/register",
  mw.inputParametersCheck,
  mw.registerDbUsernameCheck,
  async (req, res, next) => {
    const hash = await bcrypt.hash(req.body.password, 12);
    req.body.password = hash;
    const data = await User.addUser(req.body);
    return res.status(200).json(data);
  }
);

router.post(
  "/login",
  mw.inputParametersCheck,
  mw.loginDbUsernameCheck,
  async (req, res, next) => {
    const compareHash = await bcrypt.compare(
      req.body.password,
      req.user.password
    );
    let obj = { user_id: req.user.user_id };
    if (compareHash) {
      const token = jwt.sign(obj, "ssh", { expiresIn: "1d" });
      return res.status(200).json(token);
    } else {
      return res
        .status(400)
        .json({ message: "kullanıcı adı veya şifre hatalı" });
    }
  }
);

module.exports = router;
