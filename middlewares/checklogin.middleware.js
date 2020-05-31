var users = require('../models/user.model.js');

module.exports.checkLogin = async function (req, res , next){
    if (!req.signedCookies.userId) {
        res.redirect('/user/login');
        return;
    }
    var user = await users.findOne({id: req.signedCookies.userId});
    if (!user) {
        res.redirect('/user/login');
        return;
    }
    next();
};