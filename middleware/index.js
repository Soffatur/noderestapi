var express = require('express');
var auth = require('./auth');
var verification = require('./verification');
var router = express.Router();

router.post('/api/v1/register', auth.register);
router.post('/api/v1/login', auth.login);

// authorization
router.get('/api/v1/page-secure', verification(2), auth.pageSecure);

module.exports = router;