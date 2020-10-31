var express = require('express');
var router = express.Router();
var handle = require('../handlers')

router.get('/hi', handle.hi)

module.exports = router