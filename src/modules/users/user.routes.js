const express = require('express');
const router = express.Router();

const userController = require('./user.controller');
const requireAuth = require('../../middlewares/requireAuth');
const checkRole = require('../../middlewares/checkRole');

// All routes below require login
router.use(requireAuth);

router.get('/me', userController.getCurrentUser);

// Admin-only routes
router.get('/', checkRole('ADMIN'), userController.getAllUsers);
router.get('/:id', checkRole('ADMIN'), userController.getUserById);
router.delete('/:id', checkRole('ADMIN'), userController.deleteUser);

module.exports = router;
