const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {User} = require('./../models/User');

// Register a user
router.post('/register', async (req, res) => {
  let newUser = new User ({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  let user = await User.addUser(newUser);
  if (user) {
    res.redirect('/users/signup');
    // res.send('User already exists');
  } else {
    res.redirect('/users/profile');
  }
});

// Authenticate
router.post('/authenticate', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  // User.getUserByUsername(username).then((user) => {
  //   console.log(user);
  //   res.send(user);
  // });
  let user = await User.getUserByUsername(username);
  res.send(user);
});

// Profile
router.get('/profile', (req, res) => {
  res.send('Profile ...')
});

module.exports = router;
