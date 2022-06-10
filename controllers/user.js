const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// console.log(process.env.JWT_KEY_TOKEN);

// pour l'inscription
exports.signup = (req, res, next) => {
  bcrypt // hachage du mot de passe
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        password: hash, // le mot de passe haché est enregistré dans la bdd
        isAdmin: false,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
