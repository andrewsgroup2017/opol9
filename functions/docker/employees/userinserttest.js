var users = require('./db/users')
var user = {
	email: 'a@downing.com',
	// name: 'John Doe',
	// address: '1 Sesame Street',
	username: 'adowning'
}
users.create(user, function(err) {
	if (err) {
		throw err
	} else {
		console.log('user inserted')
	}
})
