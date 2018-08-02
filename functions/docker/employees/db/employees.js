var schemas = require('../schemas')
// var errors = require('../errors')
var employees = require('../app').use('employees')
/// Create user
// exports.create = schemas.validating('user', createUser)
exports.create = ('employee', createEmployee)
function createEmployee(employee, cb) {
	employees.insert(employee, employee.id, cb)
}
exports.update = schemas.validating('user', updateUser)
function updateUser(user, cb) {
	users.insert(user, errors.wrapNano(cb))
}
exports.updateDiff = updateUserDiff
function updateUserDiff(userDiff, cb) {
	merge()
	function merge() {
		users.get(
			userDiff._id,
			errors.wrapNano(function(err, user) {
				if (err) {
					cb(err)
				} else {
					extend(user, userDiff)
					schemas.validate(user, 'user', function(err) {
						if (err) {
							cb(err)
						} else {
							users.insert(user, errors.wrapNano(done))
						}
					})
				}
			})
		)
		function done(err) {
			if (err && err.statusCode == 409 && !userDiff._rev) {
				merge() // try again
			} else {
				cb.apply(null, arguments)
			}
		}
	}
}
