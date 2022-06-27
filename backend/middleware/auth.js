// Required
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    console.log(req.headers.authorization)
    try {
    
        // Get Token Authorization
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, 'test')
        const userId = decodedToken.userId
        // Verify if Token UserId = UserId
        if(!userId) {
            throw 'Invalid userId'
        } else {
            console.log('Auth Ok!')
            req.userId = userId
            next()
        }
    } catch {
        res.status(403).json({
            error: new Error(': Request unauthorized!')
        })
        console.log('error')
    }
}