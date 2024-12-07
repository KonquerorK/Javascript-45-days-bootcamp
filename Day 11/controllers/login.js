const jwt = require("jsonwebtoken");
const { UserModel } = require("../database/db");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    res.status(401).send("");
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401).send("");
    return;
  }

  const payload = {
    userId: user.id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "4h" });
  res.send({ token });
};

module.exports = {
  login,
};
