const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.home);

router.post('/searchStreet', controller.searchStreet);

module.exports = router;