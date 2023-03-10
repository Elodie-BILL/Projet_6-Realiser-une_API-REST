const express = require('express');
const helmet = require("helmet");
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require("path");

// Importation des routes des schémas implémenter en base de données ( en local )
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

const app = express();
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.set('strictQuery', true); //garantit que les valeurs transmises à notre constructeur de modèle qui n'ont pas été spécifiées dans notre schéma ne sont pas enregistrées dans la base de données.

// Connection mongoDB
mongoose.connect( process.env.DB_URL, {useNewUrlParser: true})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !')); 


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//logique de routage
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);


module.exports = app;