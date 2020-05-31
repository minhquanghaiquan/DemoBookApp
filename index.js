const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
//database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookapp', 
                 {useNewUrlParser: true, 
                  useUnifiedTopology: true});
mongoose.connection.on('connected', ()=>{
  console.log('Mongoose is connected!!');
});



var path = require ('path');
var userRoute = require('./routes/user.route');
var bookRoute = require('./routes/book.route');


app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("sdjdnjdnffkfmed1344"));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }))



app.use('/user',userRoute);
app.use('/book',bookRoute);

app.listen(3000);