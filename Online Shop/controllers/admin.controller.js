
const productModel = require('./../models/products.model')

const orderModel = require('./../models/order.model')

const validationResult = require("express-validator").validationResult
exports.getAddProduct = (req, res, next) => {
    res.render("addProduct", {
        validationAdminERR: req.flash("validationAdminERR")[0],
        addProductERR: req.flash("addProductERR"),
        isUser: true,
        isAdmin: true,
        pageTitle: 'Admin'
    })
}

exports.postAddProduct = (req, res, next) => {
    // console.log(req.file.fileName)
    // console.log(req.body)
if(validationResult(req).isEmpty()){
    productModel
    .addProduct({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        categorey: req.body.categorey,
        image: req.file.originalname
    })
    .then(() => {
        req.flash("addProductSuccess", "Product Added Successfully")
        res.redirect('/')
    })
    .catch((err) => {
        console.log(err)
        next(err)

    })
}else { 
    console.log(validationResult(req).array())
    req.flash("addProductERR", validationResult(req).array())
    res.redirect('/admin/add')
}
}

exports.getManageOrders = (req, res, next) => {
    orderModel.getAllOrders().then((orders) => {
        res.render('manage', {
            searchedEmail: '',
            orders: orders,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            errorAdminSearch: req.flash("errorAdminSearch")[0],
            pageTitle: 'Admin'
        })
    }).catch((err) => {
        console.log(err)
        next(err)

    })
}

exports.OrdersByEmail = (req, res, next) => {
    if(validationResult(req).isEmpty()){
        console.log(req.body.email)
        orderModel.getOrdersByEmail(req.body.email)
        .then((orders) => {
            res.render('manage', {
                searchedEmail: req.body.email,
                orders: orders,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                errorAdminSearch: false,
                pageTitle: 'Admin'
            })
        }).catch((err) => {
            console.log(err)
            next(err)

        })


    } else {
        req.flash('errorAdminSearch', validationResult(req).array())
        res.redirect('/admin/manage')
    }
    
}

exports.getFilteredOlders = (req, res, next) => {
    console.log(22)
    let filter = req.params.filter
    console.log(filter, req.body.searchedEmail, 5656)
    if(!req.body.searchedEmail){
        console.log(0880000)

        if(filter == 'all'){
            console.log(0880)

            orderModel.getAllOrders().then((orders) => {
                res.render('manage', {
                    searchedEmail: req.body.searchedEmail,
                    orders: orders,
                    isUser: req.session.userId,
                    isAdmin: req.session.isAdmin,
                    errorAdminSearch: false,
                    pageTitle: 'Admin'
                })
            }).catch((err) => {
                console.log(err)
                
                //res.redirect('/error')
    // or
                // res.render('error', {
                //     isUser: req.session.userId,
                //     isAdmin: req.session.isAdmin,
                    
                // })
// second way 

                next(err)


            })
        } else {
            orderModel.getOrdersByStatus(filter).then((orders) => {
                res.render('manage', {
                    orders: orders,
                    searchedEmail: req.body.searchedEmail,
                    isUser: req.session.userId,
                    isAdmin: req.session.isAdmin,
                    errorAdminSearch: false,
                    pageTitle: 'Admin'
                })
            }).catch((err) => {
                console.log(err)
                next(err)

            })
        }
    } else if(req.body.searchedEmail){
        if(filter == 'all'){
            console.log('werywue', req.body.searchedEmail)
            orderModel.getOrdersByEmail(req.body.searchedEmail).then((orders) => {
                res.render('manage', {
                    searchedEmail:req.body.searchedEmail,
                    orders: orders,
                    isUser: req.session.userId,
                    isAdmin: req.session.isAdmin,
                    errorAdminSearch: false,
                    pageTitle: 'Admin'
                })
            }).catch((err) => {
                console.log(err)
                next(err)

            })
        } else {
            orderModel.getOrdersByStatus(filter, req.body.searchedEmail).then((orders) => {
                res.render('manage', {
                    orders: orders,
                    searchedEmail: req.body.searchedEmail,
                    isUser: req.session.userId,
                    isAdmin: req.session.isAdmin,
                    errorAdminSearch: false,
                    pageTitle: 'Adimin'
                })
            }).catch((err) => {
                console.log(err)
                next(err)

        })
        }
    }
}
exports.updateStatus = (req, res, next) => {
    console.log("update cont", 1)
    console.log(req.body.status, 22)
    orderModel.updateStatusDB(req.body.cardId, req.body.status).then(() => {
        res.redirect('/admin/manage')
    }).catch(err => {
        console.log(err)
        next(err)

    })
}