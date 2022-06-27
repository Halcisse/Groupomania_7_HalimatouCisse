const express = require("express");
const router = express.Router();


//les routes pour l'authentification (connexion inscription deconnexion)
const userCtrl = require("../controllers/user");
const password = require("../middleware/password"); // on vérifie la validité du mdp

router.post("/signup", password, userCtrl.signup);
router.post("/signin", userCtrl.signin);
router.post("/signout", userCtrl.signout);

module.exports = router;
