'use strict';

const router = require('express').Router();

router.use('/cards', require('./card'));

module.exports = router;