const mongoose = require('mongoose');

const Schema = mongoo.Schema;

const CoinSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  rank: {
    type: Number,
    required: true
  },
  priceUsd: {
    type: Number,
    required: true
  },
  priceBtc: {
    type: Number,
    required: true
  },
  twentyfourHourVolumeUsd: {
    type: Number,
    required: true
  },
  marketCapUsd: {
    type: Number,
    required: true
  },
  availableSupply: {
    type: Number,
    required: true
  },
  totalSuply: {
    type: Number,
    required: true
  },
  percentChangeOneHour: {
    type: Number,
    required: true
  },
  percentChangeTwentyFourHour: {
    type: Number,
    required: true
  },
  percentChangeOneWeek: {
    type: Number,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

let Coin = mongoose.model('Coin', CoinSchema);
module.exports = {Coin};
