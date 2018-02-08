require('./config/config');

const express = require('express');

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Works');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
