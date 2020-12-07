const Sequelize = require('sequelize');
const { STRING, TEXT } = Sequelize;
const db = require('./db')

const Reminder = db.define('reminder', {
  name: {
    type: STRING,
    allowNull: false
  },
  completed: {
    type: STRING,
    defaultValue: 'false'
  }
})

module.exports = Reminder;