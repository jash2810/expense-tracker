var express = require('express');
var router = express.Router();
var handle = require('../handlers')

router.post('/credit', handle.credit)
router.post('/debit', handle.debit)
router.post('/seed/credited', handle.seedCredited)
router.post('/seed/debited', handle.seedDebited)
// to search the particular user data. we can use this api to get the debited and credited details also.
router.get('/search/:userId',handle.search)
router.post('/filter',handle.filter)

module.exports = router