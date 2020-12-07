const Sequelize = require('sequelize');
const { STRING, TEXT } = Sequelize;
const db = require('./db')

const List = db.define('list', {
  name: {
    type: STRING,
    allowNull: false
  }
})

module.exports = List;