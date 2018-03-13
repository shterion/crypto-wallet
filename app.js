require('./config/config');

const express = require('express');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Connect to Database
const {db} = require('./db/mongoose');

const app = express();
const port = process.env.PORT;

const users = require('./routes/users');

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'dist')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
