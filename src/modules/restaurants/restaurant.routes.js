const express = require('express');
const router = express.Router();
const requireAuth = require('../../middlewares/requireAuth');
const controller = require('./restaurant.controller');
const enforceCountryEntity = require("../../middlewares/checkCountry")

router.use(requireAuth);

router.get('/',  controller.getRestaurants);
router.get('/:id/menu',  enforceCountryEntity({ entity: 'restaurant', param: 'id' }), controller.getMenu);

module.exports = router;
