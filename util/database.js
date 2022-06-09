const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'PqL3h71Opk44li#Q', {
  dialect: 'postgres', 
  host: 'localhost',
  port: 5400,
  storage: "./session.postgres"
});

module.exports = sequelize;



