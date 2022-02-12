const { ApplicationError } = require('../lib/error');

module.exports = (err, req, res, next) => {
  let customError = err;

  if (!(err instanceof ApplicationError)) {
    customError = new ApplicationError('We are experiencing some problems. Please try again later.');
  }

  res.status(customError.status);
	res.json({
		error: {
			status: customError.status,
			message: customError.message
		}
	})
}