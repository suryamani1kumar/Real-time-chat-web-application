
const userDetail = require('../model/registration');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()



const JWT_SECRET = process.env.SECRET_KEY


//client ->server: Your client *somehow* as to authenticate who it is
//why -> server is a central computer which You control
//client (jhon)->a computer which you do not control

//1. client proves itself somehow on the secret/date is non changeable (jwt)
//2. client-Server share a secret (Cookie)

const loginUser = async (req, res) => {
    const { username, password } = req.body
    const user = await userDetail.findOne({ username }).lean()  //recevied json represtation of object

    if (!user) {
        return res.json({ status: 'ok', error: 'Invaild username/password' })
    }
    if (await bcrypt.compare(password, user.password)) {
        // the username, password combination is sucessful

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            JWT_SECRET
        )
        return res.json({ status: 'ok', data: token })

    }

    res.json({ status: 'error', error: 'Invalid username/password' })
}

module.exports = { loginUser }