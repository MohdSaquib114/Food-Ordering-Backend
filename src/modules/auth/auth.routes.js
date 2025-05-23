const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
// const requireAuth = require("../../middlewares/requireAuth");

router.post("/login",  authController.login);


module.exports = router;
