var books = require('../models/book.model.js');
var stores = require('../models/store.model.js');

module.exports.getStore= async function(req, res) {
    var id = req.params.id;
    var listbooks = await books.find({userId : id});
    var store = await stores.findOne({userId: id});
    if(req.signedCookies.userId && req.signedCookies.userId === id ) {
        res.render('books/mystore', {
            listbooks: listbooks,
            store: store
        })
        return
    }
    res.render('books/store', {
        listbooks: listbooks,
        store: store
    })
}

module.exports.index= async function(req, res) {
    // var listbooks = await books.find();
    res.render('books/index', {
        listbooks: await books.find()
    })
}

module.exports.listStore= async function(req, res) {
    var store = await stores.find({});
    res.render('books/listStore', {
        store: store
    });
}
module.exports.getStoreName= function(req, res) {
    res.render('books/storeName');
}
module.exports.postStoreName= async function(req, res) {
    var store = await stores.findOne({userId: req.signedCookies.userId});
    if( store === null) {
        store = new stores({
            userId: req.signedCookies.userId,
            storename: req.body.storename
        })
        const newstore = await store.save();
    }else {
        stores.findOne({userId: req.signedCookies.userId}, function (err, doc){
            doc.storename = req.body.storename;
            doc.save();
          });
    }
    res.redirect('/user/profile')
}

module.exports.deleteBook= async function(req, res) {
    var bookId = req.params.bookid;
    await books.deleteOne({ bookId: bookId });
    res.redirect('back');
}

module.exports.search= async function(req, res) {
    var name = req.query.name;
    console.log(name);
    var listbook = await books.find({});
    console.log(listbook);
    var list = listbook.filter(function(book) {
        return book.title.indexOf(name) !==-1;
    })
    console.log(list);
    
    res.render('books/index', {
        listbooks: list
    });
}