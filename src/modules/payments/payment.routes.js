const express = require('express');
const router = express.Router();
const controller = require('./payment.controller');
const requireAuth = require('../../middlewares/requireAuth');
const checkRole = require('../../middlewares/checkRole');

router.use(requireAuth);
router.get('/',checkRole('ADMIN'), controller.getMethods);
router.post('/', checkRole('ADMIN'), controller.addMethod);
router.patch('/:id', checkRole('ADMIN'), controller.updateMethod );

module.exports = router;
