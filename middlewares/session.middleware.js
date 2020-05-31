const shortid = require('shortid');
const session = require('../models/session.model');


module.exports=async function (req, res, next) {
  if(!req.signedCookies.sessionId) {
    var sessionId= shortid.generate();
    res.cookie('sessionId',sessionId, {
      signed: true
    })
    const sessiondemo = new session({id: sessionId, count: 0});
    await sessiondemo.save();
  }
//   if (!db.get('sessions').find({sessionId: req.signedCookies.sessionId}).value()) {
//     db.get('sessions').push({sessionId: req.signedCookies.sessionId}).write()
//   }
    res.locals.count= (await session.findOne({id: req.signedCookies.sessionId})).count;
    next();
}