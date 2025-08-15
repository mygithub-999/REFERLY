const express = require('express');
const router = express.Router();
const referralController=require('../controller/referralController');
const verifyToken = require('../middleware/verifyToken');

router.post('/:userId/yourapp', verifyToken,referralController.saveReferral);
router.post('/yourapp', verifyToken,referralController.getRandomReferral);

module.exports=router