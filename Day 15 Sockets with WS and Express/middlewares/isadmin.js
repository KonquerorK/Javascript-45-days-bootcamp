const {UserModel} = require("../database/db");

const isAdmin = (req, res, next) => {

  if (!req.user.is_admin) {
    res.status(403).json({error: "forbidden"});
    return;
  }

  next();
};

module.exports = isAdmin;