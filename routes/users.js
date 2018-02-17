const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {User} = require('./../models/User');

// Register a user
router.post('/users/register', async (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  if (req.body.password != req.body.confirmPassword) {
    res.send('Passwords don`t match!');
  } else {
    try {
      let user = await User.addUser(newUser);
      if (user) {
        res.json({success: false, msg: 'User already exists!'});
      } else {
        res.json({success: true, msg: 'User registered...'});
      }
    } catch (e) {
      res.send(e);
    }
  }

});

// Authenticate
router.post('/authenticate', async (req, res, next) => {
  let email = req.body.email;
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
    let user = await User.getUserByEmail(email);
    if (!user) {
      return res.json({success:false, msg: 'No User found!'});
    }

    User.comparePassword(password, user.password).then((isMatch) => {
      if (isMatch) {
        const token = jwt.sign({data:user}, process.env.SECRET, {
          expiresIn: 604800
        });
        res.send({
          success: true,
          token: `JWT ${token}`,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          }
        });
      } else {
        return res.json({success:false, msg: 'Wrong password!'});
      }
    }).catch((e) => {
       return res.json({success: false, msg: 'Wrong password!'});
    })
  } catch (e) {
    res.send(e);
  }

});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

router.post('/edit', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
  let newUsername = req.body.username;
  let email = req.user.email;
  let user = await User.editUser(email, newUsername);
  res.json({username: user.username, email: user.email,});
})

module.exports = router;
