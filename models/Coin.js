const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CoinSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
  // },
  // symbol: {
  //   type: String,
  //   required: true
  // },
  // rank: {
  //   type: Number,
  //   required: true
  // },
  // priceUsd: {
  //   type: Number,
  //   required: true
  // },
  // priceBtc: {
  //   type: Number,
  //   required: true
  // },
  // twentyfourHourVolumeUsd: {
  //   type: Number,
  //   required: true
  // },
  // marketCapUsd: {
  //   type: Number,
  //   required: true
  // },
  // availableSupply: {
  //   type: Number,
  //   required: true
  // },
  // totalSuply: {
  //   type: Number,
  //   required: true
  // },
  // percentChangeOneHour: {
  //   type: Number,
  //   required: true
  // },
  // percentChangeTwentyFourHour: {
  //   type: Number,
  //   required: true
  // },
  // percentChangeOneWeek: {
  //   type: Number,
  //   required: true
  // },
  // lastUpdated: {
  //   type: Number,
  // }
});

CoinSchema.statics.saveCoin = function (newCoin) {
  //TODO: to lowercase validation check
  let currentCoin = Coin.findOne({
    id: newCoin.id,
    name: newCoin.name
  }).then((coinExists) => {
    if (coinExists) {
      console.log('Coin already saved...');
      return coinExists;
    } else {
      newCoin.save();
      return newCoin;
    }
  });
  return currentCoin;
}

let Coin = mongoose.model('Coin', CoinSchema);
module.exports = {Coin};
