const mongoose = require('mongoose');

const Schema = mongoo.Schema;

const CoinSchema = new Schema({

});

let Coin = mongoose.model('Coin', CoinSchema);
module.exports = {Coin};
