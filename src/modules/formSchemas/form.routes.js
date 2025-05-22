const express = require('express');
const router = express.Router();
const controller = require('./form.controller');

router.get('/', controller.getAllForms);
router.get('/:name', controller.getFormByName);

module.exports = router;
