
const router = require('express').Router();

const homeController = require('./../controllers/home.controller')

//const authProtect = require("./protect/auth.protect")
router.get('/', homeController.getHome)

module.exports = router;

