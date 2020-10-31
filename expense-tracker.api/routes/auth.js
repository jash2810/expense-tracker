var express = require('express');
var router = express.Router();
var handle = require('../handlers')

router.post('/login', handle.login)
router.post('/register', handle.register)

module.exports = router