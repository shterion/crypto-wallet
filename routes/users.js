const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {User} = require('./../models/User');
const {Coin} = require('./../models/Coin');

// Register a user
router.post('/register', async (req, res, next) => {
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
        res.json({
          success: false,
          msg: 'User already exists!'
        });
      } else {
        res.json({
          success: true,
          msg: 'User registered...'
        });
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
      return res.json({
        success: false,
        msg: 'No User found!'
      });
    }

    User.comparePassword(password, user.password).then((isMatch) => {
      if (isMatch) {
        const token = jwt.sign({
          data: user
        }, process.env.SECRET, {
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
        return res.json({
          success: false,
          msg: 'Wrong password!'
        });
      }
    }).catch((e) => {
      return res.json({
        success: false,
        msg: 'Wrong password!'
      });
    })
  } catch (e) {
    res.send(e);
  }

});

// Profile
router.get('/profile', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  res.json({
    user: req.user
  });
});

// Edit profile
router.post('/edit', passport.authenticate('jwt', {
  session: false
}), async (req, res, next) => {
  let newUsername = req.body.username;
  let email = req.user.email;
  if (newUsername != undefined) {
    let user = await User.editUser(email, newUsername);
    if (user) {
      res.json({
        success: true,
        username: user.username,
        email: user.email,
        update: user.updated
      });
    }
  } else {
    res.json({
      success: false,
      msg: 'Username was not changed!'
    });
  }
});

// Dashboard
router.get('/dashboard', passport.authenticate('jwt', {session: false}),(req, res, next) => {
  res.json(req.user.coins);
});

// Add coin
router.post('/add-coin', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  //TODO: input ?
  let coin = new Coin({
    id: req.body.id,
    name: req.body.name
  });
  // COIN is undefined

  let user = await User.getUserByEmail(req.user.email);
  User.addCoin(user, req.body.coin).then((coin) => {
    console.log('HERE: ', coin);
    if (coin) {
      res.json({success: true, id:coin.id, name:coin.name});
    } else {
      res.json({success: false, msg: 'Coin already exists!'});
    }
  }).catch((e) => {
    console.log('Here error');
  });
});

module.exports = router;
