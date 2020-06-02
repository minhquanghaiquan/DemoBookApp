var express = require('express');
var router = express.Router();
var controller=require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var checkLogin= require('../middlewares/checklogin.middleware')

var multer = require('multer');
var upload = multer({dest: './public/uploads'});




router.get('/login',controller.getLogin);
router.post('/login',controller.postLogin);


router.get('/register',controller.getRegister);
router.post('/register',controller.postRegister);

router.get('/new', checkLogin.checkLogin ,controller.getNew);
router.post('/new',upload.single('image') ,validate.postNew, controller.postNew);

router.get('/profile',checkLogin.checkLogin ,controller.getProfile);

module.exports = router;