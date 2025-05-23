const express = require('express');
const router = express.Router();

const controller = require('./order.controller');
const requireAuth = require('../../middlewares/requireAuth');
const checkRole = require('../../middlewares/checkRole');
const enforceCountryEntity = require("../../middlewares/checkCountry")

router.use(requireAuth);

router.get('/', controller.getOrders);
router.post('/', controller.createOrder);
router.post(
  '/:orderId/checkout',
  checkRole('ADMIN', 'MANAGER'),
  enforceCountryEntity({ entity: 'order', param: 'orderId' }),
  controller.checkoutOrder
);
router.patch(
  '/:id/cancel',
  checkRole('ADMIN', 'MANAGER'),
  enforceCountryEntity({ entity: 'order', param: 'id' }),
  controller.cancelOrder
);

module.exports = router;
