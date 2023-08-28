const authModel = require('../models/auth.model');
const validationResult = require("express-validator").validationResult


exports.getLogin = (req, res, next) => {
    res.render('login', {
        authLoginERR: req.flash("authLoginERR")[0],
        validationERR: req.flash("validationERR"),
        isUser: false,
        isAdmin: req.session.isAdmin,
        pageTitle: 'Login'
    });
}

exports.getSignup = (req, res, next) => {
    res.render('signup', {
        authSignupERR: req.flash("authSignupERR")[0],
        validationERR: req.flash("validationERR"),
        isUser: false,
        isAdmin: false,
        pageTitle: 'Signup'
    });
}

exports.postLogin = (req, res, next) => {
    //console.log(validationResult(req))
    if(validationResult(req).isEmpty()){
        authModel
    .login(req.body.email, req.body.password)
    .then((result) => {
        // console.log(result, 1)
        req.session.userId = result.userId,
        req.session.email = req.body.email,
        req.session.isAdmin = result.isAdmin 
        res.redirect("/");
        // console.log(req.session.email, 2)
    }).catch(err => {
        req.flash("authLoginERR", err)
        res.redirect('/login')
    })
    } else {
        req.flash("validationERR", validationResult(req).array())
        res.redirect('/login')
    }
}
exports.postSignup = (req, res, next) => {
    //return console.log(validationResult(req).errors)
   // console.log(validationResult(req).errors)
    if(validationResult(req).isEmpty())// or validationResult(req).array().length() == 0
    {
        authModel
    .createAccount(req.body.username, req.body.email, req.body.password)
    .then(() => {
        res.redirect('/login');
    }).catch(err => {
       // console.log(err)
        req.flash("authSignupERR", err)
        res.redirect('/signup')
    })
    } else {
        req.flash("validationERR", validationResult(req).array())
        res.redirect('/signup')

        }
    }


exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}