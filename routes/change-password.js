const express = require('express');
const router = express.Router();
const UserPasswordchange = require('../controllers/changePasswordController')


router.post('/change-password', UserPasswordchange.passwordChange)

module.exports = router
