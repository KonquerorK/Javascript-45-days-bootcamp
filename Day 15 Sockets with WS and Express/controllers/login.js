const jwt = require("jsonwebtoken");
const { UserModel } = require("../database/db");
const bcrypt = require("bcrypt");
const { loginValidator } = require("../validators/user");
const fs = require('fs');
const path = require('path');
const sendMessage = require("../helpers/send-message.helper");


const login = async (req, res) => {
  try {
    let data = await loginValidator.validate(req.body, {
      abortEarly: false // Permet de collecter toutes les erreurs au lieu d'arrêter après la première
    });

    const { email, password } = data;
    const user = await UserModel.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(401).send({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({
        error: "Invalid email or password"
      });
    }

    const privateKey = fs.readFileSync(path.join(__dirname, '..', 'private.key'));

    const payload = {
      userId: user.id
    };
    const token = jwt.sign(payload, privateKey, {
      expiresIn: "4h", algorithm: "RS256"
    });
    res.send({ token });
    sendMessage(req.wss, { type: "Login_success" });
  } catch (e) {
    if (e.name === "ValidationError") {
      // Retourner les erreurs spécifiques de validation
      return res.status(400).send({ errors: e.errors });
    }
    // Gérer d'autres types d'erreurs
    console.error(e); // Log l'erreur pour le débogage
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  login
};
