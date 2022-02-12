const Validator = require('../validators')

module.exports = (validator) => {

	if(!Validator.hasOwnProperty(validator)){
		throw new Error(`Set up '${validator}' validator first`)
	}

	return async function(req, res, next) {
		try {
			const validated = await Validator[validator].validateAsync(req.body)
			req.body = validated
			next()
		} catch (error) {
			if(error.isJoi){
				next(error)
			}
			next(error)
		}
	}
}
