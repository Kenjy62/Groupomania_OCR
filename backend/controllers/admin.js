const User = require('../models/user')

exports.setAdmin = (req, res, next) => {
    console.log(req.body)

    User.findOne({name: req.body.name})
        .then(result => {
            if(result.admin){
                User.updateOne({name: req.body.name}, {admin: false})
                    .then(() => res.status(200).json({message: 'Plus adminn'}))
            } else {
                User.updateOne({name: req.body.name}, {admin: true})
                    .then(() => res.status(200).json({message: 'Est admin'}))
            }
        })
        .catch(error => res.status(400).json({error: 'User not found'}))
}
