var express = require('express');
var database = require('./database');
const crypto = require('crypto');
var router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');

//Read .env file to get accessKey
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../config', '.env') });

const activeTokens = new Set();

const accessTokenExp = '30s'; //  Access Token 만료
const refreshTokenExp = '1d'; //  Refresh Token 만료

//Get list of notice
router.get('/user', (req, res) => {
	//res.send(`Access Token is ok - Username: ${username}`);
	//res.json({ message: 'accessToken is existed' });

	var query1 = `SELECT * FROM account `;
	database.query(query1, function (error, data) {
		if (error) {
			throw error;
		}
		else {
			var total_records = data.length;
			//console.log(total_records);

			//console.log(JSON.stringify(data));
			res.json(data);
		}
	});//end database.query(query1)
});



router.post('/check-login', (req, res) => {
	const { username, password } = req.body;
	const new_password = crypto.createHash('md5').update(password).digest('hex');
	const query = `SELECT * FROM account WHERE username="${username}" AND password="${new_password}"`;

	//console.log(query);
	database.query(query, function (error, data) {
		if (error) {
			throw error;
		} else {
			var total_records = data.length;
			if (total_records > 0) {
				//save message to json file
				const message = { message: 'login success' };
				const jsonMessage = JSON.stringify(message);
				fs.writeFile('output-check-login.json', jsonMessage, (err) => { });

				// Create token
				const payload = { username };
				const secretKey = process.env.ACCESS_TOKEN_SECRET;
				//const secretKey ="test";
				accessToken = jwt.sign(payload, secretKey, { expiresIn: accessTokenExp });
				refreshToken = jwt.sign(payload, secretKey, { expiresIn: refreshTokenExp });
				activeTokens.add(accessToken);
				activeTokens.add(refreshToken);
				res.status(200).json({ message: 'login success' });
				//console.log(accessToken);
				//res.json({ message: 'login success' });
			} else {
				const message = { message: 'login fail' };
				const jsonMessage = JSON.stringify(message);
				fs.writeFile('output-check-login.json', jsonMessage, (err) => { });
				res.status(400).json({ message: 'login fail' });
				//res.json({ message: 'login fail' });
			}
		}
	});
});




module.exports = router;