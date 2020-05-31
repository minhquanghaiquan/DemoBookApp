var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema( {
    id: String,
    count: Number
});
var session = mongoose.model('session', sessionSchema);
module.exports = session;