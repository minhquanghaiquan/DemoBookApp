const session = require('../models/session.model.js');
module.exports.addToCart=async function(req,res) {
    // var bookid = req.params.bookid;
    // var sessionId = req.signedCookies.sessionId;
    // var cart = await session.findOne({userId: sessionId});
    // console.log(cart.count);
    // console.log(await session.find());
    // console.log(typeof req.signedCookies.sessionId)
    // console.log(req.signedCookies.sessionId ===(await session.find()));
    session.findOne({id: req.signedCookies.sessionId}, function (err, doc){
        doc.count +=1,
        doc.save();
        });
    res.redirect('/book');
}