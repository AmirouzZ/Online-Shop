
 
const mongoose = require('mongoose')
const db_url = "mongodb://localhost:27017/Online-Shop"

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String,
    categorey: String
})

const Product = mongoose.model('product', productSchema);

exports.getAllProducts = () => {
    //connect to DB
    // get products
    //disconnect
    // mongoose.connect(db_url).then(() => {
    //     product.find().then((products) => {
    //         mongoose.disconnect()
    //     })
    // })
    return new Promise((res, rej) => {
       // return rej('err')
        mongoose.connect(db_url).then(() => {
            return Product.find()
        }).then((products) => {
            mongoose.disconnect()
            res(products)
        }).catch(err => {
            mongoose.disconnect()
            rej(err)
        })
    })
}

exports.getProductsByCategorey = (categorey) => {
    return new Promise((res, rej) => {
        mongoose.connect(db_url).then(() => {
            return Product.find({categorey: categorey})
        }).then(products => {
            mongoose.disconnect()
            res(products)
        }).catch(err => {
            mongoose.disconnect()
            rej(err)
        })
    })
}

exports.getProductById = (id) => {
    return new Promise((res, rej) => {
        mongoose.connect(db_url).then(() => Product.findById(id)).then((product) => {
            mongoose.disconnect()
            res(product)
        }).catch(err => {
            mongoose.disconnect()
            rej(err)
        })
    })
}

exports.getFirstProduct = () => {
    return new Promise((res, rej) => {
        mongoose.connect(db_url).then(()=> {
            return Product.findOne();
        }).then(product => {
            mongoose.disconnect();
            res(product);
        }).catch(err => rej(err))
    })
}


exports.addProduct = (productInfo) => {
    console.log(productInfo)
    return new Promise((res, rej) => {
        mongoose.connect((db_url)).then(() => {
            let product = new Product(productInfo)
            return product.save()
        }).then(() => {
            mongoose.disconnect()
            res('ok')
        }).catch((err) => {
            mongoose.disconnect()
            rej(err)
        })
    })
}