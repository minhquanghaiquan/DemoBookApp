var mongoose = require('mongoose');

var userSchema = new mongoose.Schema( {
    id: String,
    name: String,
    email: String,
    password: String
});

var users = mongoose.model('users', userSchema);

module.exports = users;