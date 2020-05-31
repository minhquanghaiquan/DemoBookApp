var books = require('../models/book.model.js');

module.exports.getStore= async function(req, res) {
    var id = req.params.id;
    var listbooks = await books.find({userId : id});
    res.render('books/store', {
        listbooks: listbooks
    })
}

module.exports.index= async function(req, res) {
    // var listbooks = await books.find();
    res.render('books/index', {
        listbooks: await books.find()
    })
}