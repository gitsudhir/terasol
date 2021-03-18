const chalk = require('chalk');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const morganMiddleware = morgan(function (tokens, req, res) {
	return [
		'\n',
		// chalk.hex('#ff4757').bold(),
		chalk.hex('#34ace0').bold(tokens.method(req, res)),
		chalk.hex('#ffb142').bold(tokens.status(req, res)),
		chalk.hex('#ff5252').bold(tokens.url(req, res)),
		chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
		chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res)),
		chalk.yellow(tokens['remote-addr'](req, res)),
		chalk.hex('#fffa65').bold('from ' + tokens.referrer(req, res)),
		chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
		'',
	].join(' ');
});

// create express app
const app = express();

// for logging
app.use(morganMiddleware);

// Setup server port
const port = process.env.PORT || 4000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(express.json())
// define a root/default route
app.get('/', (req, res) => {
	res.json({ "message": "Hello World " });
});
// listen for requests
app.listen(port, () => {
	console.log(chalk.green.bold("Node server is listening on ") + chalk.yellow.bold.underline(`http://localhost:${port}`));
});