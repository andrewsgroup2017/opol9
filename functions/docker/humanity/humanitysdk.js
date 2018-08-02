var axios = require('axios')
var querystring = require('querystring')

exports.getToken = function() {
	return new Promise(function(resolve, reject) {
		var token = ''
		var payload = {
			client_id: '0cbaa9173943569cad4c0b8267981147bac0cf5d',
			client_secret: 'be6a34d0830ab6fb3db837958d50faace249e0d1',
			grant_type: 'password',
			username: 'ash@andrewscarpetcleaning.com',
			password: 'sugarlips42',
			redirect_uri: 'https://andrewsadmin.firebaseapp.com/#/'
		}
		var querystring = require('querystring')
		axios
			.post('https://www.humanity.com/oauth2/token.php', querystring.stringify(payload))
			.then((response) => {
				var data = response.data.access_token
				resolve(data)
			})
			.catch((error) => {
				console.error(new Error(error))
				reject(error)
			})
	})
}

exports.getEmployees = function(token) {
	return new Promise(function(resolve, reject) {
		axios
			.get('https://www.humanity.com/api/v2/employees?access_token=' + token)
			.then((res) => {
				resolve(res.data.data)
			})
			.catch((err) => {
				reject(err)
			})
	})
}
// app.post('/run', function(req, res) {
// 	var authorizationCode = 'a16ad67218ea0f937df2007405decefe56d8fbb4'

// 	async function getTokenx() {
// 		var r = await getToken()
// 		// console.log(r.access_token)
// 		res.end(r.access_token, null)
// 	}
// 	getTokenx()
// })
