const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Il y a eu trop de requêtes depuis cette adresse IP!",
});

// parse requests of content-type - application/json
app.use(express.json());

// on definit les routes principales
const userRoute = require("./routes/user");

//Connexion à la base de donnée avec Mongoose
mongoose
  .connect(
    "mongodb+srv://HaliGroupomania:20rcgX7UFsF40qql@halimatoucisse.tgmrw.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//permet de gérer les erreurs de connexion sur plusieurs serveurs (CORS)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application!" });
});

app.use(express.json()); // les requetes entrantes sont parsés en json
app.use(limiter); // Sécurise l'authentification
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
); // Sécurise le serveur Express

app.use("/api/auth", userRoute);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
