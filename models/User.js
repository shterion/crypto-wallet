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

// UserSchema.statics.getUserById = function (id) {
//   let User = this;
//   return User.findById({id});
// }
//
// UserSchema.statics.getUserByUsername = function (username) {
//   let User = this;
//   return User.findOne({username});
// }

UserSchema.statics.addUser = function (newUser) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save();
    })
  });
}

let User = mongoose.model('User', UserSchema);
module.exports = {User};
