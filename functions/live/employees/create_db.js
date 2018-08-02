var couch = require('./employeeCrud')
couch.db.create('test2', function(err) {
	if (err) {
		console.error(err)
	}
})
