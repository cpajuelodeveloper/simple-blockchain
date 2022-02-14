const Validators = require('../validators')
const { ApplicationError } = require('../lib/error')

module.exports = (validator) => {

	if(!Validators.hasOwnProperty(validator)){
		throw new Error(`Set up '${validator}' validator first`)
	}

	return async function(req, res, next) {
		try {
			const validated = await Validators[validator].validateAsync(req.body)
			req.body = validated
			next()
		} catch (error) {
			if(error.isJoi){
				next(new ApplicationError(error.name, error.message, 400));
			}
			next(new ApplicationError(error.name, error.message, 500));
		}
	}
}
