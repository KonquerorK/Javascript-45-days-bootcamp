const {
    getAllUser,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    uploadPicture,
} = require("../controllers/user");
const authorization = require("../middlewares/authorization");

const router = require("express").Router();

const path = require("path");
const multer = require("multer");
const isAdmin = require("../middlewares/isadmin");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "..", "public", "users"));
    },
    filename: (req, file, callback) => {
        const MIME_MAP = {
            "image/png": "png",
            "image/gif": "gif",
            "image/jpeg": "jpeg",
            "image/jpg": "jpg",
        };

        // callback(null, `user_profile_${req.user.id}.${MIME_MAP[file.filename]}`);
        callback(null, `user_profile_${req.user.id}.${MIME_MAP[file.mimetype]}`);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (request, file, callback) => {
        const mimeTypes = ["image/png", "image/gif", "image/jpeg", "image/jpg"];

        if (!mimeTypes.includes(file.mimetype)) {
            callback(null, false);
            request.hasError = true;
            request.errors = {
                picture: ["invalid file type"],
            };
            return;
        }

        callback(null, true);
    },
});

router.get("/", authorization, getAllUser); // Utilise authorization pour les utilisateurs authentifiés
router.post("/", createUser); // Crée un utilisateur (accessible à tous)
router.get("/:id", authorization, getUser); // Route pour un utilisateur spécifique
router.put("/:id", authorization, updateUser); // Nécessite authentification
router.delete("/:id", authorization, isAdmin, deleteUser); // Nécessite authentification et privileges admin
router.post(
    "/:id/picture",
    authorization,
    upload.single("picture"),
    uploadPicture
);

module.exports = router;
