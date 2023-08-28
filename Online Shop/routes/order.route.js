const bodyParser = require("body-parser").urlencoded({
    extended:true
})

const authProtect = require('./protect/auth.protect')
const orderController = require('./../controllers/order.controller')
const router = require("express").Router()
const check = require("express-validator").check

router.get('/toAddAddress', orderController.getAddAddress)

router.post(
'/toAddAddress', 
authProtect.isAuthenticated,
bodyParser,
orderController.getAddAddress)    

router.post('/submit', 
authProtect.isAuthenticated,
bodyParser,
check("address")
.not()
.isEmpty()
.withMessage("Address is required"),
orderController.submitOrder)

router.get('/orders',
authProtect.isAuthenticated,
orderController.getOrdersPage)

router.post('/cancel', authProtect.isAuthenticated, bodyParser, orderController.cancelOrder)
router.post('/cancelAll', authProtect.isAuthenticated, orderController.cancelAllOrders)

// router.post("/orderAll", authProtect.isAuthenticated, orderController.submitOrder)
module.exports = router
