const express = require('express')

const { TransactionController } = require('../controllers')
const { requestValidator } = require('../middlewares')
const { successHandler } = require('../middlewares');

const router = express.Router()

router.post('/transaction', requestValidator('transaction'), successHandler, TransactionController.post);

module.exports = router