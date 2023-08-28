const productsModel = require('./../models/products.model')

exports.getHome = (req, res, next) => {
    
    // // get categorey
    // let categorey = req.query.categorey
    // if(categorey && categorey != 'all'){
    //     productsModel.getProductsByCategorey(categorey).then(products => {
    //         res.render('index', {
    //             products: products
    //         })
    //     })
    // }else{
    //     //get products
    // // render index.ejs
    // productsModel.getAllProducts().then(products => {
    //     res.render('index', {
    //         products: products
    //     })
    // })
    
    // }
let categorey = req.query.categorey
let validCateg = ['clothes', 'mobilephone', 'laptop', 'shoes']
let productsPromise 
if(categorey && validCateg.includes(categorey)){
    productsPromise = productsModel.getProductsByCategorey(categorey)
}else{
    productsPromise = productsModel.getAllProducts()
}
// let a = "rrr"
// req.flash('addProductSuccess', a)
    //console.log(req.flash('addProductSuccess')[0], "home cont")
    // console.log(req.flash("addProductSuccess")[0], 44)

productsPromise.then((products) => {
    // console.log(req.flash("addProductSuccess")[0], 44)
    res.render('index', {
        products: products,
        isAdmin: req.session.isAdmin,
        isUser: req.session.userId,
        addProductSuccess: req.flash("addProductSuccess")[0],
        validationCardERR: req.flash("validationCardERR")[0],
        //addProductERR: false
        pageTitle: 'Home'
    })
}).catch((err) => {
   //res.redirect('/error')
    console.log(err)
})

}

