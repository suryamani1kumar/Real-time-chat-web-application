const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.SECRET_KEY

const passwordChange = (req, res) => {
    const { token } = req.body
    const user = jwt.verify(token, JWT_SECRET)
    console.log(user)

}

module.exports = { passwordChange }