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



const accessTokenExp = '10s'; //  Access Token 만료
const refreshTokenExp = '1d'; //  Refresh Token 만료
const accesssecretKey = "simg1";
const refreshsecretKey = "simg2";

let loginResult = '';
let addResult = '';
// MD5
function hashPassword(password) {
	return crypto.createHash('md5').update(password).digest('hex');
}

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
				loginResult = { message: 'Login success' };

				// Create token
				const payload = { username };

				//const secretKey ="test";
				accessToken = jwt.sign(payload, accesssecretKey, { expiresIn: accessTokenExp });
				refreshToken = jwt.sign(payload, refreshsecretKey, { expiresIn: refreshTokenExp });
				res.status(200).json({ message: 'Login success' });

			} else {

				loginResult = { message: 'login fail' };
				res.status(400).json({ message: 'Login fail' });

			}
		}
	});
});

router.get('/check-login/output', function (req, res, next) {
	res.json(loginResult);
});



router.get('/accessTokenCheck', (req, res) => {
	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {
				const username = decoded.username;
				//res.send(`Login successful - Username: ${username}`);
				res.status(200).json({ message: 'Login success' });
			}
		});
	} catch (error) {
		//res.send('Login fail');
		res.status(400).json({ message: 'Login fail' });
	}

});

router.get('/accessTokenAgain', (req, res) => {
	try {
		jwt.verify(refreshToken, refreshsecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {
				const username = decoded.username;
				const payload = { username };
				accessToken = jwt.sign(payload, accesssecretKey, { expiresIn: accessTokenExp });
				res.status(200).json({ message: 'accessToken 재발급했다' });
			}
		});
	} catch (error) {
		res.status(400).json({ message: 'Login fail' });
	}

});

router.post('/add', (req, res) => {
	const { username, password, name, job } = req.body;

	try {
		jwt.verify(accessToken, accesssecretKey, (err, decoded) => {
			if (err) {
				throw new Error('Invalid access token');
			} else {

				const querycheckUser = `SELECT * FROM account WHERE username="${username}"`;
				database.query(querycheckUser, function (error, datacheckUser) {
					if (error) {
						throw error;
					} else {
						var total_records = datacheckUser.length;
						if (total_records > 0) {
							addResult = { message: 'user exist' }; 
							res.status(201).json({ message: 'user exist' });
						}
						else {
							const queryGetId = `SELECT * FROM account ORDER BY idAcc DESC LIMIT 1`;
							//console.log(query);
							database.query(queryGetId, function (error, dataGetId) {
								if (error) {
									throw error;
								} else {

									const idAcc = dataGetId[0].idAcc + 1;
									const new_password = hashPassword(password);
									var queryInsert = `INSERT INTO account (idAcc, username, password, name, job) VALUES ("${idAcc}", "${username}", "${new_password}", "${name}", "${job}" )  `;
									database.query(queryInsert, function (error) {
										if (error) {
											//throw error;
											addResult = { message: 'Add fail' };
											res.status(401).json({ message: 'Add fail' });
										}
										else {
											addResult = { message: 'Add success' };
											res.status(200).json({ message: 'Add success' });
										}
									});
								}
							});
						}

					}
				});
			} //end else
		}); //end  jwt.verify
	} catch (error) {
		addResult = { message: 'Login fail' };
		res.status(400).json({ message: 'Login fail' });
	}



});
router.get('/add/output', function (req, res, next) {
	res.json(addResult);
});

module.exports = router;