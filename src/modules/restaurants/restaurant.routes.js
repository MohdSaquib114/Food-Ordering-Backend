const express = require('express');
const router = express.Router();
const requireAuth = require('../../middlewares/requireAuth');
const controller = require('./restaurant.controller');

router.use(requireAuth);

router.get('/', enforceCountryEntity({ entity: 'restaurant', param: 'id' }), controller.getRestaurants);
router.get('/:id/menu',  enforceCountryEntity({ entity: 'restaurant', param: 'id' }), controller.getMenu);

module.exports = router;
