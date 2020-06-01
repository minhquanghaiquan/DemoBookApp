var users = require('../models/user.model.js');
const session = require('../models/session.model');

module.exports= async function (req, res , next){
    if (!req.signedCookies.userId) {
        res.locals.user = {} ;
    }
    var user = await users.findOne({id: req.signedCookies.userId});
    if (!user) {
        res.locals.user = {} ;
    }
    res.locals.user = user;
    if (!req.signedCookies.sessionId) {
        res.locals.count = 0 ;
    }
    
    next();
};