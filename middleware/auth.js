const jwt = require('jsonwebtoken')
require('dotenv').config()



const JWT_SECRET = process.env.SECRET_KEY

module.exports = () => {
    return (req, res, next) => {
        console.log('need Authorization')
        //find jwt token in hader
        // const token = req.header['Authorization']
        const { token } = req.body
        console.log(token)
        if (!token) {
            return res.status(401).send('Sorry denied of access')
        }
        // validate token
        const tokenBody = token.slice(7)
        jwt.verify(tokenBody, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(`jwt error ${err} `);
                res.status(401).send('denied error')
            }
            //jwt good
            next();

        })

    }
}