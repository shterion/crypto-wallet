const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
    unique: true,
    validate: [{
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email'
    }]
  },
  password: {
    type: String,
    minlength: 5,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now
  },
  coins: [{
    id: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    }
  }]
});

// Get User By Id
UserSchema.statics.getUserById = (id) => {
  let user = User.findOne({_id:id});
  return user;
};

// Get User By Username
UserSchema.statics.getUserByEmail = (email) => {
  let user = User.findOne({email}).then((user) => {
    return new Promise((resolve, reject) => {
      resolve(user);
    });
  }).catch((e) => {
    console.log(e);
  });
  return user;
};

// Register a User
UserSchema.statics.addUser = (newUser) => {
  let currentUser = User.findOne({
    email: newUser.email
  }).then((user) => {
    if (user) {
      console.log('User already exists');
      return user;
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser.save();
        })
      });
    }
  });
  return currentUser;
};

// Edit user
UserSchema.statics.editUser = async (email, newUsername) => {
  try {
    let user = await User.getUserByEmail(email);
    user.username = newUsername;
    user.updated = Date.now();
    user.save();
    return user;
  } catch (e) {
    console.log(e);
  }
};

// Compare passord
UserSchema.statics.comparePassword = (candidatePassword, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if (isMatch === true) {
        resolve(isMatch);
      }
      reject();
    });
  });
};

// Add a coin
UserSchema.statics.addCoin = (user, coin) => {
  let userCoins = user.coins;
  let searchCoin;

  userCoins.forEach((currentCoin) => {
    if ((currentCoin.id == coin.id && currentCoin.name == coin.name) ||
        currentCoin.id == coin.id || currentCoin.name == coin.name) {
      console.log('Coin already exists...');
      searchCoin = currentCoin;
    }
    return searchCoin;
  });

  if (!searchCoin) {
    user.coins.push(coin);
    return user.save().then(() => {
      return coin;
    });
  } else {
    return new Promise((resolve, reject) => {
      reject();
    });
  }
}

let User = mongoose.model('User', UserSchema);
module.exports = {User};
