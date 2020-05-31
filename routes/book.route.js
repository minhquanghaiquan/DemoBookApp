var express = require('express');
var router = express.Router();
var controller=require('../controllers/book.controller');

router.get('/:id',controller.getStore);
router.get('/',controller.index);
router.get('/liststore/all',controller.listStore);
router.get('/:id/storename',controller.getStoreName);
router.get('/:bookid/delete', controller.deleteBook);
module.exports = router;
