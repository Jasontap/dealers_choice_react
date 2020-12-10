const router = require('express').Router();
const List = require('../db/list');
const Reminders = require('../db/reminder')

// router.get('/lists', async(req, res, next) => {
//   try {
//     const lists = await List.findAll();
//     res.send(lists);
//   }
//   catch(ex) {
//     next(ex)
//   }
// })

// router.get('/lists/:id', async(req, res, next) => {
//   try{
//     const reminders = await Reminders.findByPk(req.params.id);
//     res.send(reminders);
//   }
//   catch(ex) {
//     next(ex)
//   }
// })

module.exports = router;