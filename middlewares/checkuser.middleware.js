var users = require('../models/user.model.js');

module.exports= async function (req, res , next){
    if (!req.signedCookies.userId) {
        res.locals.user = {} ;
    }
    var user = await users.findOne({id: req.signedCookies.userId});
    if (!user) {
        res.locals.user = {} ;
    }
    res.locals.user = user;
    next();
};