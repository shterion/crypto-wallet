const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {User} = require('./../models/User');

// Register a user
router.post('/register', async (req, res) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  try {
    let user = await User.addUser(newUser);
    if (user) {
      res.redirect('/users/signup');
      // res.send('User already exists');
    } else {
      res.redirect('/users/profile');
    }
  } catch (e) {
    res.send(e);
  }

});

// Authenticate
router.post('/authenticate', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  // User.getUserByUsername(username).then((user) => {
  //   if (!user) {
  //     res.send('No user found');
  //   } else {
  //     res.send(user);
  //   }
  // }).catch((e) => {
  //   console.log(e);
  // });

  try {
    let user = await User.getUserByUsername(username);
    if (!user) {
      res.send('No user found');
    } else {
      res.send(user);
    }
  } catch (e) {
    res.send(e);
  }

});

// Profile
router.post('/profile', async (req, res) => {
  // res.send('Profile ...');
  let id = req.body.id;
  try {
    let user = await User.getUserById(id);
    // console.log(user);
    if (!user) {
      res.send('No user found!');
    } else {
      res.send(user);
    }
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
