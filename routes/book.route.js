var express = require('express');
var router = express.Router();
var controller=require('../controllers/book.controller');

router.get('/:id',controller.getStore);
router.get('/',controller.index);

module.exports = router;