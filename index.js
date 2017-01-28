const express = require('express')
const app = express()
const http = require('http').Server(app);
const port = 3000
const bodyParser = require('body-parser');

var hostname = 'localhost';

var srcPath = __dirname;
var destPath = __dirname;


// allows app to get data from POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(__dirname + '/web/'));

/*
app.get('/', (request, response) => {
  response.send('Hello from Express!')
})*/

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
