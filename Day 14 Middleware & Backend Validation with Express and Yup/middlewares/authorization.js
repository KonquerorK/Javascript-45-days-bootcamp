// const authorization = (req, res, next) => {
//     if (!req.user) {
//         res.status(401).send("errorrr");
//         return;
//     }

//     next();
// }

// module.exports = authorization;


const authorization = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: "Accès non autorisé. Veuillez vous authentifier." });
    }
    next();
};

module.exports = authorization;
