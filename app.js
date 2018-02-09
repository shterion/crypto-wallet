require('./config/config');

const express = require('express');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const {db} = require('./db/mongoose');

const app = express();
const port = process.env.PORT;

const users = require('./routes/users');

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/users', users);

// require('./config/passport')(passport);

// app.use(express.static(path.join(__dirname, 'dist')))

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

// Index Route
app.get('/', (req, res) => {
  res.send('Works');
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
