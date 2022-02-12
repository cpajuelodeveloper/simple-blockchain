const Joi = require('joi');

const postTransactionSchema = Joi.object({
    message: Joi.string().min(5).required()
});

module.exports = postTransactionSchema;