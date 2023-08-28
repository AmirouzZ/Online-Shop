const express = require('express')
const path = require('path')
const app = express()
const session = require("express-session")
const SessionStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash")

const static = express.static(path.join(__dirname, 'assets'))
const staticImages = express.static(path.join(__dirname, 'images'))
app.use(flash());


const Store = new SessionStore({
    uri:"mongodb://localhost:27017/Online-Shop",
    collection:"session"
})

app.use(session({
    secret:"Hello From The Either Side",
    saveUninitialized:false,
    cookie:{
        // default
    },
    store: Store
}))



const homeRouter = require('./routes/home.route') 
const productRouter = require('./routes/product.route')
const authRouter = require('./routes/auth.route') 
const cardRouter = require('./routes/card.route')
const orderRouter = require('./routes/order.route')
const adminRouter = require("./routes/admin.route")
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(static)
app.use(staticImages)
app.use('/', homeRouter)
app.use('/', authRouter)
app.use('/product', productRouter)
app.use('/card', cardRouter)
app.use('/order', orderRouter)
app.use('/admin', adminRouter)
// app.use('/error', (req, res, next) => {
//     res.render('error', {
//         isUser: req.session.userId,
//         isAdmin: req.session.isAdmin,
        
//     })
// })

app.use('/error', (req, res, next) => {
    res.status(500)
    res.render('error', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: 'Error'
    })
})
app.use((error, req, res, next) => {
    res.redirect('/error')
})

app.get('/notAdmin',  (req, res, next) => {
    res.status(403)
    res.render('notAdmin', {
        isUser: req.session.userId,
        isAdmin: false,
        pageTitle: 'not Admin'
    })
})

app.use((req, res, next) => {
    res.status(404)
    res.render('notFound', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: 'NOT FOUND'
    })
})

const port = process.env.PORT || 8000
app.listen(port, () => console.log("server is runnnnnning on port" + port))