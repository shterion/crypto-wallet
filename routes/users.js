const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {User} = require('./../models/User');

// Register
// router.post('/register', (req, res, next) => {
//   let newUser = new User {
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password
//   };
//
//   newUser.addUser(newUser).then.((user) => {
//     res.json({success: true, msg: 'User registered'})
//     console.log(user);
//   }).catch((e) => {
//     res.json({success: false, msg: 'Failed to register user'});
//     console.log(e);
//   });
//
// });


router.post('/register', async (req, res) => {
  let newUser = new User ({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  let user = await User.addUser(newUser);
  res.redirect('/users/profile');
});



// Authenticate
router.post('/authenticate', (req, res, next) => {
  res.send('Authenticate ...')
});

// Profile
router.get('/profile', (req, res, next) => {
  res.send('Profile ...')
});

module.exports = router;
