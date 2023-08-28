
const router = require('express').Router()
const authController = require('./../controllers/auth.controller')
const bodyParser = require('body-parser').urlencoded({
    extended: true
})

const check = require("express-validator").check
const authProtect = require('./protect/auth.protect')

router.get('/login', authProtect.isNotAuthenticated, authController.getLogin);

router.post('/login',bodyParser,
check("email").not().isEmpty().withMessage("Email is required").isEmail().withMessage("Wrong email format"),
check("password").isLength({min: 6}).withMessage("password must be 6 letters at least"), 
authController.postLogin);


router.get('/signup', authProtect.isNotAuthenticated, authController.getSignup);

router.post('/signup',
bodyParser,
 check("username").not().isEmpty().withMessage("username is required"),
 check('email').not().isEmpty().withMessage("email is required").isEmail().withMessage('wrong email format'),
 check('password').isLength({min:6}).withMessage("password must be 6 letters at least"),
//  // middleware 
//  (req, res, next) => {
//     let val = req.body.confirmPassword;
//     return check("confirmPassword").equals(val)
//  }
//  // custom validator 
check("confirmPassword").custom((value, meta) => {
    if(value == meta.req.body.password) return true
    else throw "Unmatched passwords"
}),
authController.postSignup);

router.all("/logout",authProtect.isAuthenticated, authController.logout)

module.exports = router