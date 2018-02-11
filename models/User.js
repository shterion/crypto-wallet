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
  }
});

UserSchema.statics.getUserByUsername = function (username) {
  let user = User.findOne({username}).then((user) => {
    return new Promise(function(resolve, reject) {
      resolve(user);
    });
  });
  return user;
}

UserSchema.statics.addUser = function(newUser) {
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

let User = mongoose.model('User', UserSchema);
module.exports = {
  User
};
