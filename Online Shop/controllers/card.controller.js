
const cardModel = require("./../models/card.model")
const validationResult = require("express-validator").validationResult 

exports.postCard = (req, res, next) => {
    if(validationResult(req).isEmpty())
    cardModel.addNewItemToCard({
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        productId: req.body.productId,
        userId: req.session.userId,
        timestamp: Date.now()
    }).then(() => {
        res.redirect('/card')
    }).catch(err => {
        console.log(err)
    })
    else {
        req.flash("validationCardERR", validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}

exports.getCard = (req, res, next) => {
    cardModel.getUserCard(req.session.userId)
    .then((items) => {
        res.render("card", {
            items: items,
            isUser: true,
            isAdmin: req.session.isAdmin,
            validationCardERR: req.flash("validationCardERR")[0],
            pageTitle: 'Card'
        })
    }).catch(err => {
            console.log(err)
        })
}


exports.postSaveNewAmount = (req, res, next) => {
    if(validationResult(req).isEmpty()){
       // console.log("ok1")
        //console.log(req.body.cardId)
        cardModel
        .editItemAmount(req.body.cardId,{
            amount:req.body.amount,
            timestamp: Date.now()
            }).then(() => {
                //console.log("ok3")
            res.redirect('/card')
        }).catch(err => {
            console.log(err)
        })
    } else {
        //console.log(validationResult(req).array())
        req.flash("validationCardERR", validationResult(req).array())
        res.redirect('/card')
    }
}

exports.postDeleteItemCard = (req, res, next) => {
    cardModel.deleteItem(req.body.cardId)
    .then(() => {
        res.redirect('/card')
    }).catch(err => {
        console.log(err)
    })
}

exports.postDeleteAllItems = (req, res, next) => {
    cardModel.DeleteAllItems().then(() => {
        res.redirect('/card')
    }).catch((err) => {
        console.log(err)
    })
}
