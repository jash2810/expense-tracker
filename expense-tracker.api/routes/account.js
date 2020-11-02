var express = require('express');
var router = express.Router();
var handle = require('../handlers')

router.post('/credit', handle.credit)
router.post('/debit', handle.debit)
// to search the particular user data. we can use this api to get the debited and credited details also.
router.get('/search/:userId',handle.search)

module.exports = router