var Joi = require('joi')
module.exports = Joi.object().keys({
	_rev: Joi.string(),
	_id: Joi.string(),
	id: Joi.string(),
	username: Joi.string().alphanum().min(3).max(30).required()
})
