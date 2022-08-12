const express = require('express');
const LoginUser = require('../controllers/loginController')

const router = express.Router()

router.post('/', LoginUser.loginUser)

module.exports = router
