const { ApplicationError } = require('../lib/error')
const { TransactionService } = require('../services')

module.exports.post = async (req, res, next) => {
	const { message } = req.body
	try {
		const result = await TransactionService.createTransaction(message)
		res.status(201).json(result)
	} catch(error) {
		next(new ApplicationError(error.name, error.message, error.status))
	}
}