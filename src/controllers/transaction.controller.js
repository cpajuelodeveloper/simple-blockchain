const { TransactionService } = require('../services')

module.exports.post = async (req, res, next) => {
	const { message } = req.body
	try {
		const result = await TransactionService.createTransaction(message)
		res.status(200).json(result)
	} catch(error) {
		next(error)
	}
}