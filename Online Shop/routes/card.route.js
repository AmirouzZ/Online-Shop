

const router = require("express").Router()

const bodyParser = require("body-parser").urlencoded({extended:true})

const cardController = require('./../controllers/card.controller')

const authProtect = require('./protect/auth.protect')

const check = require('express-validator').check

router
.post('/',
authProtect.isAuthenticated
, bodyParser, 
check("amount")
.not()
.isEmpty()
.withMessage("amount is required")
.isInt({min: 1})
.withMessage("amount must be 1 or more"),
cardController.postCard)

router.get('/', 
authProtect.isAuthenticated, 
cardController.getCard)

router.post(
'/save', 
authProtect.isAuthenticated,
bodyParser, 
check("amount")
.not()
.isEmpty()
.withMessage("amount is required")
.isInt({min: 1})
.withMessage("amount must be 1 or more"),
cardController.postSaveNewAmount
)

router.post(
'/delete', 
authProtect.isAuthenticated,
bodyParser,
cardController.postDeleteItemCard)

router.post(
    '/deleteAll', 
    authProtect.isAuthenticated,
    bodyParser,
    cardController.postDeleteAllItems)


module.exports = router