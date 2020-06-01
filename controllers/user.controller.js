var users = require('../models/user.model.js');
var books = require('../models/book.model.js');
const bcrypt = require('bcrypt');




module.exports.getLogin = function(req , res){
    res.render('users/login.pug');
};
module.exports.postLogin =async function(req , res){
    var email = req.body.email;
    var password = req.body.password;
    var user = await users.findOne({email: email});

    if (user === null) {
        res.render('users/login', {
          errors : [
            'User is wrong'
          ],
          values: req.body
        });
        return;
    }
    if(!bcrypt.compareSync(password, user.password)) {
        res.render('users/login', {
          errors : [
            'Password is wrong'
          ],
          values: req.body
        });
        return;
      }
    res.cookie('userId', user.id, {
        signed: true
    });
    res.redirect('/book');
};

module.exports.getRegister = function(req , res){
    res.render('users/register.pug');
};
module.exports.postRegister = async function(req , res){
    try {
        req.body.id = Date.now().toString();
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await users.create(req.body);
        res.redirect('/user/login')
    } catch {
        res.redirect('/user/register');
    }
};

module.exports.getNew = function(req , res){
  res.render('users/new.pug');
};
module.exports.postNew = async function(req , res){
  try {
    var userId = req.signedCookies.userId;
    req.body.image = req.file.path.split('\\').slice(2).join('/');
    const book = new books({
    title: req.body.title,
    author: req.body.author,
    pageCount: req.body.pageCount,
    description: req.body.description,
    image: req.body.image,
    userId: userId,
    bookId: Date.now()
  })
  const newbook = await book.save();
  res.redirect('/user/profile')
  } catch (error) {
    console.log(error);
    res.redirect('/user/profile');
  }
  
};

module.exports.getProfile = async function(req , res){
  var userId = req.signedCookies.userId;
  var user = await users.findOne({id: userId});
  res.render('users/profile.pug' , {
      user: user,
      userId: userId
  });
};

