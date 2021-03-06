const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Item = sequelize.define('item', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  itemname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  taskstatus: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Item;