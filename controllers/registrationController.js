const userDetail = require('../model/registration');
const bcrypt = require('bcrypt')

const userRegistration = async (req, res) => {

    const { name, username, password: plaintextpassword, email, } = req.body

    if (!username || typeof username !== 'string') {
        return res.json({
            status: 'error',
            error: 'Invalid username'
        })
    }
    if (!plaintextpassword || typeof plaintextpassword !== 'string') {
        return res.json({
            status: 'error',
            error: 'Invalid password'
        })
    }
    if (plaintextpassword.length <= 6) {
        return res.json({
            status: 'error',
            error: 'password too small. Should be at least 6 characters'
        })
    }

    const password = await bcrypt.hash(plaintextpassword, 10)

    try {
        const Detail = await userDetail.create({
            username, email, name, password
        })
        console.log('Detail', Detail)
    }
    catch (err) {
        // console.log('error', err.message)
        // console.log(JSON.stringify(err))
        if (err.code === 11000) {
            //duplicate key
            return res.json({ status: 'error', err: 'Username already  use' })
        }
        throw err
    }
    res.json({ status: 'ok' })
}

module.exports = { userRegistration }