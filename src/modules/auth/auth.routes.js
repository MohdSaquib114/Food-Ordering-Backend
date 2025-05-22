const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const requireAuth = require('../../middlewares/requireAuth');

router.get('/me', requireAuth, userController.getCurrentUser);

module.exports = router;
