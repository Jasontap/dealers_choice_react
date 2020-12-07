const router = require('express').Router();
const List = require('../db/list');

router.get('/lists', async(req, res, next) => {
  try {
    res.send(await List.findAll());
  }
  catch(ex) {
    next(ex)
  }
})

module.exports = router;