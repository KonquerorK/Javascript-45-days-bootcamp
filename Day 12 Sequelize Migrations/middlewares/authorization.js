const authorization = (req, res, next) => {
    if (!req.user) {
        res.status(401).send("");
        return;
    }

    next();
}

module.exports = authorization;