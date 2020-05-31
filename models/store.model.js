var mongoose = require('mongoose');

var storeSchema = new mongoose.Schema( {
    userId: String,
    storename: String
});

var stores = mongoose.model('stores', storeSchema);

module.exports = stores;