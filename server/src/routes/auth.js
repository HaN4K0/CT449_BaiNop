const express = require('express');
const router = express.Router();
const authController = require('../controller/auth/auth');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/staffSignup', authController.staffSignup);
router.post('/staffSignin', authController.staffSignin);

module.exports = router;
