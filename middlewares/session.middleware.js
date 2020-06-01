const shortid = require('shortid');
const session = require('../models/session.model');


module.exports=async function (req, res, next) {
    if(!req.signedCookies.sessionId) {
      var sessionId= shortid.generate();
      a = sessionId;
      res.cookie('sessionId',sessionId, {
        signed: true
      })
      const sessiondemo = new session({id: sessionId, count: 0});
      await sessiondemo.save();
      res.locals.count = sessiondemo.count
      next();
  }else{
      res.locals.count = (await session.findOne({id: req.signedCookies.sessionId})).count;
      next();
  }
}