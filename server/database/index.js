const { Pool } = require('pg')
// pools will use environment variables
// for connection information
const pool = new Pool({
  user: 'chris',
  host: 'localhost',
  database: 'reviews',
  password: 'password',
  port: 5432
})

pool.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to db');
  }
})

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
}