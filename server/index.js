const db = require('./database/index.js');
const express = require('express');
var router = require('./routes/routes.js');

const app = express();
app.use(express.json());
const port = 3001;
app.use(router);


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

module.exports = app;