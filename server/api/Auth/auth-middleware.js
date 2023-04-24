const User = require("../Users/users-model");

function inputParametersCheck(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password || username == "" || password == "") {
    return res.status(403).json({ message: "eksik alanları doldurunuz" });
  } else {
    next();
  }
}

async function registerDbUsernameCheck(req, res, next) {
  const { username } = req.body;
  const usernameCheck = await User.getByFilter(username);
  if (usernameCheck) {
    return res.status(400).json({ message: "kayıtlı kullanıcı bulunmaktadır" });
  } else {
    next();
  }
}

async function loginDbUsernameCheck(req, res, next) {
  const { username } = req.body;
  const usernameCheck = await User.getByFilter(username);
  if (!usernameCheck) {
    return res
      .status(400)
      .json({ message: "böyle bir kullanıcı bulunmamaktadır" });
  } else {
    req.user = usernameCheck;
    next();
  }
}
module.exports = {
  inputParametersCheck,
  registerDbUsernameCheck,
  loginDbUsernameCheck,
};
