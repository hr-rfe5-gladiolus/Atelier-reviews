const db = require('./database/index.js');
const express = require('express');

const app = express();
app.use(express.json());
const port = 3001;


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})