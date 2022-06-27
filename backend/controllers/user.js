//Models
const User = require('../models/user')

// Required
const bcrypt = require('bcrypt')
const salt = 10
const jwt = require('jsonwebtoken')


// Functions
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, salt)
    .then(hash => {
        console.log(hash)
        const user = new User({
            ...req.body,
            password: hash,
            admin: false,
        })

        user.save()
            .then(() => res.status(201).json({message: 'User Created'}))
            .catch(error => res.status(400).json({error: `Problème d'inscription, contacter l'administrateur`}))
        .catch(error => res.status(500).json({error: `Erreur d'encryptage du mot de passe, contacter l'administrateur`}))
    })
}

// Login
exports.login = (req, res, next) => {

    // Check if email exist
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        // If not exist
        if(!user) {
            return res.status(401).json({error: 'User not found!'})
        }

        // Else, Compare password
        bcrypt.compare(req.body.password, user.password)
        .then(result => {

            // If password wrong
            if(!result){
                return res.stats(401).json({error: 'Wrong Password!'})
            }

            // Else
            return res.status(200).json({
                userId: user._id, 
                token: jwt.sign({ userId: user._id}, 'test', {expiresIn: '24h'})
            })
            
        })
        // bcrypt Error
        .catch((error) => res.status(500).json({error: error}))
    }).catch((error) => res.status(500).json({error: error}))
}

exports.getData = (req, res, next) => {
    console.log(req.userId)
    User.findOne({
        _id: req.userId
    }).then(data => {
        return res.status(200).json({data})
    }).catch(error => { return res.status(400).json({error})})
}