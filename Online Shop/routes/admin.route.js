
const router = require("express").Router()
const check = require("express-validator").check
const adminController = require("./../controllers/admin.controller")
// const bodyParser = require('body-parser').urlencoded({
//     extended: true,
// })
const adminProtect = require("./../routes/protect/admin.protect")
const multer = require('multer')
const bodyParser = require("body-parser").urlencoded({extended:true})

router.get('/add', 
adminProtect,
adminController.getAddProduct)

router.post('/add', adminProtect,  multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "images")
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      )
            }
        })       
    // dest:'images', 
   // file:  // to get file sent from form
   
   // files when use array() or fields()
}).single("image"),
check('image').custom((value, meta) => {
    if(meta.req.file) return true
    else throw "image is required"
}), check("name")
.not().isEmpty().withMessage("Product name is required"),
check("price")
.not().isEmpty().withMessage("Product price is required").isInt({min: 10}).withMessage("price must be 10$ at least"),
check("description").isLength({min: 6}).withMessage("description must be 6 letter at least"),
check("categorey")
.not().isEmpty().withMessage("Product categorey is required"),adminController.postAddProduct)
module.exports = router

router.get('/manage',adminProtect, adminController.getManageOrders)

router.post('/search',
 bodyParser,
  check('email')
  .not().
  isEmpty()
  .withMessage('Email is required')
  .isEmail()
  .withMessage('email format error'),
adminController.OrdersByEmail)



router.post('/sentOrder',bodyParser, adminController.updateStatus)

router.post('/:filter' ,bodyParser,adminController.getFilteredOlders)
// router.post('/pending', adminController.getPendingOrders)