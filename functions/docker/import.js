const nano = require('nano')('http://ash:asdf@localhost:5984')
var arr = []
var db
var fs = require('fs')
var j = []
var arr = []
function read() {
	return new Promise(function(resolve, reject) {
		fs.readFile('./sample.json', 'utf8', function(err, data) {
			if (err) throw err
			// console.log(data)
			var j = JSON.parse(data)
			for (var e of j) {
				arr.push(e)
				// console.log(e)
			}
			resolve(arr)
		})
	})
}

function insertCouch(emp, db) {
	return new Promise(function(resolve, reject) {})
	console.log(emp.id)
	resolve(db.insert(emp))
}

async function write(data, db) {
	for (var d of data) {
		console.log(d.id)
		await insertCouch(d, db)
	}
}

async function asyncCall() {
	var arr = []
	const data = await read()
	await nano.db.destroy('employees')
	await nano.db.create('employees')
	const db = await nano.use('employees')

	console.log(data.length)

	// const response = await write(data, db)
	const response = await db.bulk({ docs: data }).then((body) => {
		console.log(body)
	})
	return arr
}

asyncCall()
// fs.readFile('sample.json', (err, data) => {
// 	if (err) throw err
// 	console.log(data)
// 	j = data
// })

// let n = Nano('http://ash:asdf@localhost:5984')
// let db = n.db.use('employees')

// db.bulk({ docs: arr }).then((body) => {
// 	console.log(body)
// })
