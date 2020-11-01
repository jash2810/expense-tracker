var express = require('express');
var router = express.Router();
var handle = require('../handlers')

router.post('/credit', handle.credit)
router.post('/debit', handle.debit)
router.get('/search',handle.search)
router.get('/all',handle.all)

module.exports = router