const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
require('dotenv').config()
//database
const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_qhnczkjx:ll612l9l6hkek0lpriuilqmdks@ds135760.mlab.com:35760/heroku_qhnczkjx', 
                 {useNewUrlParser: true, 
                  useUnifiedTopology: true});
mongoose.connection.on('connected', ()=>{
  console.log('Mongoose is connected!!');
});



var path = require ('path');
var userRoute = require('./routes/user.route');
var bookRoute = require('./routes/book.route');
var cartRoute = require('./routes/cart.route');
var checkUser= require('./middlewares/checkuser.middleware')
var session= require('./middlewares/session.middleware')

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("sdjdnjdnffkfmed1344"));
app.use(session);
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }))
app.use(checkUser);



app.use('/home', function(req, res){
  res.render('home');
})
app.use('/logout', function(req, res) {
  res.clearCookie('userId');
  res.redirect('/home');
})
app.use('/cart',cartRoute);
app.use('/user',userRoute);
app.use('/book',bookRoute);


app.listen(process.env.PORT || 3000);