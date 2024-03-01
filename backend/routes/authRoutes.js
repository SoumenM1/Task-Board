const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
// router.post('/signup', authController.signup);
// Other authentication routes (register, logout) can be added here

module.exports = router;
