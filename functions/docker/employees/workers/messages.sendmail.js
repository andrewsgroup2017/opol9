var follow = require('follow')
var couch = require('../couchdb')
var messages = couch.use('messages')
var messages = couch.use('messages')
var feed = follow(
	{
		db: couch.config.url + '/' + 'messages',
		include_docs: true
	},
	onChange
)
feed.filter = function filter(doc) {
	return doc._id.indexOf('_design/') != 0 && !doc.notifiedRecipient
}
function onChange(err, change) {
	if (err) {
		console.error(err)
	} else {
		console.log('change:', change)
		feed.pause()
		var message = change.doc
		sendEmail(message, sentEmail)
	}
	function sentEmail(err) {
		if (err) {
			console.error(err)
		} else {
			message.notifiedRecipient = true
		}
		messages.insert(message, savedMessage)
	}
}
function sendEmail(message, cb) {
	// Fake send email
	setTimeout(cb, randomTime(1e3))
}
function savedMessage(err) {
	if (err) {
		console.error(err)
	}
	feed.resume()
}
function randomTime(max) {
	return Math.floor(Math.random() * max)
}
