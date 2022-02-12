const express = require('express')

const { TransactionController } = require('../controllers')
const { Validator } = require('../middlewares')

const router = express.Router()

router.post('/transaction', Validator('transaction'), TransactionController.post);

module.exports = router