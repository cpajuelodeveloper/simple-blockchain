const { ApplicationError } = require('../lib/error');

module.exports = (err, req, res, next) => {
  let customError = err;

  if (!(err instanceof ApplicationError)) {
    customError = new ApplicationError('Server Error', 'We are experiencing some problems. Please try again later.', 500);
  }

	res.status(customError.status).json({
		payload: null,
		status: {
			success: false,
			message: customError.message,
			code: customError.status
		}
	})
}