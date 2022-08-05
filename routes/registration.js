const express = require('express');
const UserRegistration = require('../controllers/registrationController')

const router = express.Router()

router.post('/', UserRegistration.userRegistration)

module.exports = router