const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const h = require('./humanity/humanitysdk')
// const couch = require('./employees/app')
var Humanity = require('humanity-js-sdk')
var auth = new Humanity.Auth(
	'f983d1eab8469494fe9c497cd7c859c85cc3b5b5',
	'https://74.194.202.74/#/cb',
	null,
	[ 'company.view' ],
	'd05937b5c87654331dff8901e2d82c9851a9f22d'
)
app.use(bodyParser.json())

// var employees = require('./employees/db/employees')

// async function insertCouch(employee) {
// 	const emp = await employees.create(employee, function(err) {
// 		if (err) {
// 			throw err
// 		} else {
// 			console.log('employee inserted')
// 		}
// 	})
// }

// employees.create(employee, function(err) {
// 	if (err) {
// 		throw err
// 	} else {
// 		console.log('employee inserted')
// 	}
// })

app.post('/init', function(req, res) {
	try {
		res.status(200).send()
	} catch (e) {
		res.status(500).send()
	}
})
async function getResult(action) {
	const t = await h.getToken()
	switch (action) {
		case 'get_employees':
			const employees = await h.getEmployees(t)
			return employees
			break
		case 'Mangoes':
		default:
			break
	}
}
var fs = require('fs')
async function write(emps) {
	console.log(JSON.stringify(emps))
	fs.writeFile('./sample.txt', JSON.stringify(emps), (err) => {
		if (err) {
			console.error(err)
			return
		}
		console.log('File has been created')
	})
}
app.post('/run', function(req, res) {
	const action = req.body.value.action
	async function result(action) {
		// const result = await getResult(action)

		var emps = await getResult(action)
		write(emps)
		// for (var emp of emps) {
		//     write(emp)
		// }
	}
	result(action)
	res.json(result)

	// Get the token
	// auth.getToken(authorizationCode, function(token) {
	// 	// Make a request using the token
	// 	Humanity.get('companies', {}, token.access_token, function(response) {
	// 		console.log(response)
	// 	})
	// })
})
// app.post('/run', function(req, res) {
// 	var payload = (req.body || {}).value

// 	var result = {
// 		result: {
// 			'echo-demo2': payload
// 		}
// 	}
// 	res.status(200).json(result)
// })

app.listen(8080, function() {
	console.log('Listening on port 8080')
})
