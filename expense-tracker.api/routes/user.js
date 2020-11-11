var express = require('express');
var router = express.Router();
var handle = require('../handlers')

router.put('/profile', handle.profile)

module.exports = router