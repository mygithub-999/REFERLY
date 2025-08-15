const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const getUser = require('../controller/userController');

router.get('/:id', verifyToken, getUser);

module.exports = router;
