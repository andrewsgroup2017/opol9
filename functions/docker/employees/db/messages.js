var extend = require('util')._extend
var schemas = require('../schemas')
var errors = require('../errors')
var messages = require('../app').use('messages')
/// Create user
exports.create = schemas.validating('message', 'create', createMessage)
function createMessage(message, cb) {
	message.createdAt = Date.now()
	messages.insert(message, errors.wrapNano(cb))
}
exports.getFor = getMessagesFor
function getMessagesFor(user, cb) {
	messages.view(
		'by_to',
		'by_to',
		{ keys: [ user ], include_docs: true },
		errors.wrapNano(function(err, result) {
			if (err) {
				cb(err)
			} else {
				result = result.rows.map(function(row) {
					return row.doc
				})
				cb(null, result)
			}
		})
	)
}
/// Messages for a given user
exports.getFor = getMessagesFor
function getMessagesFor(user, cb) {
	messages.view(
		'by_to_createdAt',
		'by_to_createdAt',
		{
			startkey: [ user, 0 ],
			endkey: [ user, Date.now() ],
			include_docs: true
		},
		errors.wrapNano(function(err, result) {
			if (err) {
				cb(err)
			} else {
				result = result.rows.map(function(row) {
					return row.doc
				})
				cb(null, result)
			}
		})
	)
}
function getMessagesFor(user, cb) {
	messages.view(
		'by_to_createdAt',
		'by_to_createdAt',
		{
			startkey: [ user, Date.now() ],
			endkey: [ user, 0 ],
			descending: true,
			include_docs: true
		},
		errors.wrapNano(function(err, result) {
			if (err) {
				cb(err)
			} else {
				result = result.rows.map(function(row) {
					return row.doc
				})
				cb(null, result)
			}
		})
	)
}
/// Count messages for a given user
exports.countFor = countMessagesFor
function countMessagesFor(user, cb) {
	messages.view(
		'to_count',
		'to_count',
		{
			keys: [ user ],
			group: true
		},
		errors.wrapNano(function(err, result) {
			if (err) {
				cb(err)
			} else {
				cb(null, result.rows[0].value)
			}
		})
	)
}
