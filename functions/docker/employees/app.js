var Humanity = require('humanity-js-sdk')

// Instantiate auth class
var auth = new Humanity.Auth(
	'f983d1eab8469494fe9c497cd7c859c85cc3b5b5',
	'https://74.194.202.74/#/cb',
	null,
	[ 'company.view' ],
	'd05937b5c87654331dff8901e2d82c9851a9f22d'
)
//a16ad67218ea0f937df2007405decefe56d8fbb4
// Generate SignIn URI
var signInUri = auth.generateSigninUri() // https://accounts.humanity.com/oauth2/authorize?client_id=your_client_id&redirect_uri=your_redirect_uri%2F&company_id=&scope=company.view&response_type=code

console.error('env = ', process.env.NODE_ENV)

var cloudantUrl = ''
if (process.env.NODE_ENV == 'PRODUCTION') {
	cloudantUrl =
		'https://8e41cb6a-9660-44fc-a60e-3cbd4c952423-bluemix:35a7b60d8d7c5b651dc2534ee9c085d10415247383808c4cffa6cef2bbc307e6@8e41cb6a-9660-44fc-a60e-3cbd4c952423-bluemix.cloudant.com'
} else {
	cloudantUrl = 'http://couchdb:couchdb@74.194.202.74:5984'
}
var nano = require('nano')
// nano = nano(cloudantUrl || 'http://0.0.0.0:5984')
nano = nano(cloudantUrl || 'http://0.0.0.0:5984')
module.exports = nano

const dbName = 'transcripts'
// const dbName = 'library'
var db
// var initCouch = require('./init_couch')
// initCouch(function(err) {
// 	if (err) {
// 		throw err
// 	} else {
// 		console.log('couchdb initialized')
// 	}
// })

// //test

// /**
//  * Create document in database.
//  */
// function insert(cloudantDb, doc, params) {
// 	return new Promise(function(resolve, reject) {
// 		cloudantDb.insert(doc, params, function(error, response) {
// 			if (!error) {
// 				console.log('success', response)
// 				resolve(response)
// 			} else {
// 				console.log('error', error)
// 				reject(error)
// 			}
// 		})
// 	})
// }

// function readDocument(cloudantDb, docId, params) {
// 	return new Promise(function(resolve, reject) {
// 		cloudantDb.get(docId, params, function(error, response) {
// 			if (!error) {
// 				console.log('success', response)
// 				resolve(response)
// 			} else {
// 				console.error('error', error)
// 				reject(error)
// 			}
// 		})
// 	})
// }

// function getTranscriptionJob(params) {
// 	var params = {
// 		TranscriptionJobName: params.TranscriptionJobName /* required */
// 	}
// 	transcribeservice.getTranscriptionJob(params, function(err, data) {
// 		if (err)
// 			console.log(err, err.stack) // an error occurred
// 		else console.log(data) // successful response
// 	})
// }

// function listTranscriptionJobs() {
// 	console.log('listTranscriptionJobs invoked')
// 	return new Promise(function(resolve, reject) {
// 		var params = {
// 			MaxResults: 20,
// 			//   NextToken: 'STRING_VALUE',
// 			Status: 'COMPLETED'
// 		}
// 		transcribeservice.listTranscriptionJobs(params, function(err, data) {
// 			if (err) {
// 				console.log(err)
// 				reject(err)
// 			} else {
// 				// an error occurre
// 				resolve(data) // successful response
// 			}
// 		})
// 	})
// }

// function removeExistingJobs(jobsList) {
// 	console.log('checkifExistsCloudant invoked')
// 	return new Promise(function(resolve, reject) {
// 		for (var job of jobsList.TranscriptionJobSummaries) {
// 			// console.log(job)
// 			console.log(prettyjson.render(job))
// 			readDocument(cloudantDb, job.TranscriptionJobName, params)
// 		}
// 	})
// }

// function getDatabase() {
// 	var cloudantOrError = require('cloudant')({
// 		url: cloudantUrl
// 	})
// 	if (typeof cloudantOrError !== 'object') {
// 		return Promise.reject(cloudantOrError)
// 	}
// 	db = cloudantOrError
// 	if (!dbName) {
// 		return Promise.reject('dbname is required.')
// 	}
// 	db = db.use(dbName)
// 	if (typeof db !== 'object') {
// 		return Promise.reject(db)
// 	}
// 	return Promise.resolve(db)
// }

// function insertBooks() {
// 	return new Promise(function(resolve, reject) {
// 		var books = [
// 			{
// 				author: 'Charles Dickens',
// 				title: 'David Copperfield'
// 			},
// 			{
// 				author: 'David Copperfield',
// 				title: 'Tales of the Impossible'
// 			},
// 			{
// 				author: 'Charles Dickens',
// 				title: 'Great Expectation'
// 			}
// 		]

// 		db.bulk(
// 			{
// 				docs: books
// 			},
// 			function(er) {
// 				if (er) {
// 					throw er
// 				}

// 				resolve(console.log('Inserted all documents'))
// 			}
// 		)
// 	})
// }

// function determineExtension() {}

// function getActors() {}

// function insertTranscript(transcriptionJob) {
// 	return new Promise(function(resolve, reject) {
// 		var transcript = {
// 			jobName: transcriptionJob.TranscriptionJobName,
// 			mediaFileUri: transcriptionJob.Media.MediaFileUri,
// 			transcript: transcript.results.transcripts[0].transcript,
// 			extension: determineExtension(),
// 			phoneNumber: _phoneNumber,
// 			direction: _direction,
// 			actors: getActors()
// 		}

// 		var transcript = {}
// 		db.bulk(
// 			{
// 				docs: books
// 			},
// 			function(er) {
// 				if (er) {
// 					throw er
// 				}

// 				resolve(console.log('Inserted all documents'))
// 			}
// 		)
// 	})
// }

// async function createIndex() {
// 	// Note, you can make a normal JavaScript function. It is not necessary
// 	// for you to convert it to a string as with other languages and tools.
// 	var book_indexer = function(doc) {
// 		if (doc.author && doc.title) {
// 			// This looks like a book.
// 			index('title', doc.title)
// 			index('author', doc.author)
// 		}
// 	}

// 	var ddoc = {
// 		_id: '_design/library',
// 		indexes: {
// 			books: {
// 				analyzer: {
// 					name: 'standard'
// 				},
// 				index: book_indexer
// 			}
// 		}
// 	}

// 	db.insert(ddoc, function(er, result) {
// 		if (er) {
// 			throw er
// 		}

// 		console.log('Created design document with books index')
// 	})
// }
// async function searchDB(author) {
// 	db.search(
// 		'library',
// 		'books',
// 		{
// 			q: 'author:' + author
// 		},
// 		function(er, result) {
// 			if (er) {
// 				throw er
// 			}

// 			console.log('Showing %d out of a total %d books', result.rows.length, result.total_rows)
// 			for (var i = 0; i < result.rows.length; i++) {
// 				console.log('Document id: %s', result.rows[i].id)
// 			}
// 		}
// 	)
// }
// async function getIndexes() {
// 	// return new Promise(function (resolve, reject) {

// 	db.index(function(er, result) {
// 		if (er) {
// 			throw er
// 		}

// 		console.log('The database has %d indexes', result.indexes.length)
// 		for (var i = 0; i < result.indexes.length; i++) {
// 			console.log('  %s (%s): %j', result.indexes[i].name, result.indexes[i].type, result.indexes[i].def)
// 		}

// 		result.should.have.a.property('indexes').which.is.an.Array
// 		done()
// 	})
// 	// })
// }

function getToken() {
	Humanity.getToken(authorizationCode, function(token) {
		// Make a request using the token
		Humanity.get('companies', {}, token.access_token, function(response) {
			console.log(response)
		})
	})
}
function main(params) {
	console.log('zip functionAsynch.js invoked')
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve({ done: true, echo: params })
		}, 1000)
	})
}

exports.main = main
// function main(params) {
// 	console.log('zip app.js invoked')
// 	// db = await getDatabase()
// 	// getToken()
// 	return getToken()
// 	// const books = await insertBooks(cloudantDb)
// 	// return await createIndex(cloudantDb)
// 	// return getIndexes()
// 	//return searchDB('David Copperfield')

// 	// try {
// 	//   const jobsList = await listTranscriptionJobs()
// 	//   jobsList = await removeExistingJobs(jobsList)
// 	//   console.log(jobsList)
// 	//   return jobsList
// 	// } catch (error) {
// 	//   console.log(error)
// 	//   return error
// 	// }
// }

// exports.main = main
