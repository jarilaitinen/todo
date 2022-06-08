const { Pool } = require('pg');

const credentials = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'PqL3h71Opk44li#Q',
    port: 5400,
  };


const pool = new Pool(credentials);
  
module.exports = {
    query: (text, params, callback) => {
      return pool.query(text, params, callback)
    },
  }; 

