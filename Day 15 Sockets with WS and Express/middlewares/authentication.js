const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");
const { UserModel } = require("../database/db");
const fs = require('fs');
const path = require('path');



const authentication = async (req, res, next) => {
    const token = req.headers?.authorization?.replace("Bearer ", "");

    if (!token) {
        req.user = null; // Marquer explicitement l'utilisateur comme non authentifié
        return next();
    }

    try {
        const privateKey = fs.readFileSync(path.join(__dirname, '..', 'private.key'));
        const payload = jwt.verify(token, privateKey, {
            algorithms: "RS256",
        });
        const userId = payload.userId;
        const user = await UserModel.findByPk(userId);

        if (!user) {
            return res.status(401).json({ error: "Utilisateur non trouvé." });
        }

        req.user = user; // Attacher l'utilisateur authentifié
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token invalide ou expiré." });
    }
};

module.exports = authentication;
