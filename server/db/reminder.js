const Sequelize = require('sequelize');
const { STRING, BOOLEAN } = Sequelize;
const db = require('./db')

const Reminder = db.define('reminder', {
  name: {
    type: STRING,
    allowNull: false
  },
  completed: {
    type: BOOLEAN,
    defaultValue: false
  }
})

module.exports = Reminder;