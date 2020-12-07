const router = require("express").Router();

router.use('/lists', require('./lists'))

module.exports = router;