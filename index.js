const express = require('express');
const app = express();
const port = 3000;
const http = require('http').Server(app); //dunno what this is

//body parser stuff?
const bodyParser = require('body-parser');

/* DUNNO
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const http = require('http').Server(app);
*/

//route our app

var router = require('./app/routes');
app.use('/', router);

app.use(express.static(__dirname + '/web'));

// start server
app.listen(port, function(err){
	if(err){
		return console.log('something bad happened', err);
	}
	console.log('Listenin on port:' + port);
});
