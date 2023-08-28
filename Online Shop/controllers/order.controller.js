const orderModel = require('./../models/order.model')
const cardModel = require('./../models/card.model')
const validationResult = require("express-validator").validationResult

exports.getAddAddress = (req, res, next) => {
let order
    // if(req.body.items){
    //     order = req.body.items
    // } else {
        // console.log(req.body.name)
       // if(req.body.name){
             order = new Object({
                email: req.session.email,
                 name: req.body.name,
                 price: req.body.price,
                 amount: req.body.amount,
                 cardId: req.body.cardId,
                 })
             //   }
    //}
    console.log(order)
    res.render("addAddress", {
        order: order,
        isUser: true,
        pageTitle: 'addAddress',

        name: false,
        isAdmin:req.session.isAdmin,
        validationAddressERR: req.flash("validationAddressERR")[0]
    })
}

exports.submitOrder = (req, res, next) => {
    //console.log(validationResult(req))
    if(validationResult(req).isEmpty()){
        // console.log(req.body.name)
        // console.log(req.body.address)
        // console.log(req.body.amount)
        // console.log(req.body.cardId)
        //console.log(new Date())
        //console.log(validationResult(req))
// console.log(req.body.order)
//          if(!req.body.order)
//          {console.log(1)
if(req.body.name)
    orderModel.addNewOrder({
        email: req.session.email,
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        address: req.body.address,
        timestamp: new Date(),
        userId: req.session.userId,
        cardId: req.body.cardId,
        status: "pending"
        }).then(() => {
            cardModel.deleteItem(req.body.cardId)
        }).then(() => {
            res.redirect('/order/orders')
        }).catch((err) => {
            console.log(err)
        })
        
    else {  
        // let order = []
        // order[i] = req.body.order
        // let data = [];
        // for(let i = 0; i <= order.length; i++){
        //     data[i] = {items: req.body.order,
                // amount: req.body.amount,
                 // name: req.body.name,
                 //price: req.body.price,
                //  address: req.body.address,
                //  timestamp: new Date(),
                 //userId: req.session.userId,
                //  status: "Pending" 
                cardModel.getUserCard(req.session.userId).then((cards) => {
                   // console.log(data)
                   //console.log(cards, 72)
                //    let orders = []
                //    for(let i = 0; i <= cards.length; i++){
                //     orders[i] = cards
                //    }
                    orderModel.addAllOrders(cards, {
                   // amount: req.body.amount,
                    // name: req.body.name,
                    //price: req.body.price,
                    address: req.body.address,
                    email: req.session.email,
                    timestamp: new Date(),
                    //userId: req.session.userId,
                    status: "pending"
                    }).then(() => {
                        return cardModel.DeleteAllItems(req.session.userId)
                    }).then(() => {
                        res.redirect('/order/orders')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
            }

                

             } else {
        req.flash("validationAddressERR", validationResult(req).array())
        //res.redirect('/order/toAddAddress')
       let order = new Object({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            cardId: req.body.cardId,
            })
        res.render("addAddress", {
           // order: false,
            order: order,
            isUser: true,
            pageTitle: 'addAddress',

            isAdmin:req.session.isAdmin,
            validationAddressERR: req.flash("validationAddressERR")[0]
        })
    }
}

exports.getOrdersPage = (req, res, next) => {
    orderModel.getOrders(req.session.userId).then((orders) => {
        res.render("orders", {
            isUser: true,
            isAdmin:req.session.isAdmin,
            pageTitle: 'Order',
            orders: orders
        })
    }).catch((err) => {
        console.log(err)
    })
}


exports.cancelOrder = (req, res, next) => {
    orderModel
    .deleteOrder(req.body.cardId)
    .then(() => {
        res.redirect('/order/orders')
    }).catch((err) => {
        console.log(err)
    })
}


exports.cancelAllOrders = (req, res, next) => {
    orderModel
    .deleteAllOrders(req.session.userId)
    .then(() => {
        res.redirect('/order/orders')
    }).catch((err) => {
        console.log(err)
    })
}


