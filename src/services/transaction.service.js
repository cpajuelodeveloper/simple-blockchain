const { ApplicationError } = require('../lib/error');

module.exports.createTransaction = async (message) => {
	try {
		return { message: `Transaction created. Message: ${message}` }
	} catch(error) {
		throw new ApplicationError(error.name, error.message, error.status);
	}
}