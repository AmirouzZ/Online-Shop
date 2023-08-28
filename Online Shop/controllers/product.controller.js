const productsModel = require('../models/products.model')

exports.getFirstProduct = (req, res, next) => {
    productsModel.getFirstProduct().then((firstProduct) => 
    {
        res.render('product', {
            product:firstProduct,
            isFirst: true,
            pageTitle: 'Products',
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            validationCardERR: req.falsh("validationCardERR")[0]
        })
    })
}
exports.getProductById = (req, res, next) => {
    // get id
    // get product
    // render
    let id = req.params.id
    productsModel.getProductById(id).then((product) => {
        res.render('product', {
            product: product,
            pageTitle: product.name,

            isAdmin: req.session.isAdmin,
            isFirst: false,
            isUser: req.session.userId,
            validationCardERR: req.flash("validationCardERR")[0]

        })
    })

}