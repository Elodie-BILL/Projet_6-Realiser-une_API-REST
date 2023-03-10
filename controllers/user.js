const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const User = require('../models/user');

//cryptage du mot de passe à l'inscription
exports.signup = (req, res, next) => {
    
    bcrypt.hash (req.body.password, 10)
    .then (hash =>{
        const user = new User({
            email: req.body.email,
            password: hash 
        });
        user.save()
            .then(() => 
                res.status(201).json({ message: 'Compte utilisateur crée'})
            ) /*201 création de ressource*/
            .catch(
                error => res.status(400).json({ error })
            );
    })
    .catch(error => res.status(500).json({ error }));
    //erreur 500 = erreur server

};



exports.login = (req,res,next) =>{
    
    User.findOne({email: req.body.email })
    .then(
        //vérifiactions si utilisateur retrouver dans base de donnée
    user => {
        if(!user){
            res.status(401).json({message : 'Identifiant / mot de passe incorrecte'});

        }else{
            bcrypt.compare(req.body.password, user.password)
            .then(valid=> {
                if(!valid){
                    res.status(401).json({message: 'Identifiant/mot de passe incorrecte'})
                } else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId : user._id},
                            process.env.secretKeyToken,
                            {expiresIn: '24h'}
                        )
                        
                    });
                }

            })
            .catch(error => {
                res.status(500).json({error});

            })
        }
    })
    .catch(error => {
        res.status(500).json({error});
    });

};
