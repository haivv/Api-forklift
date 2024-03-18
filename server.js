var express = require('express');//import express NodeJS framework module
const http = require('http');
var bodyParser = require('body-parser');
var app = express();// create an object of the express module
var apirouter = require('./lib/api');
var swaggerRouter = require('./lib/swaggerRouter'); // 새로 생성한 라우터 파일을 불러옵니다.
const jwt = require('jsonwebtoken');

const fs = require('fs');


app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
  });

 //Start API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api', apirouter);
app.use('/api-docs', swaggerRouter);


app.use((req, res, next) => {
    res.status(200).send('Hello, world!\n');
  });
  

const PORT = 3000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}/`);
});
