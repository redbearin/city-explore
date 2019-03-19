'use strict';
//configure environment variables
//in other words, use the .env file
require('dotenv').config();

//Application dependencies
const express = require('express');
const app = express();

//Cross Origin Resource Sharing (cors)
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT;

app.use(express.static('./'));

//test route
//form of a route: app.METHOD(PATH, CALLBACK)
app.get('/testing', (request, response) => {
  console.log ('Hit the testing route!');
  let caity = {firstName: 'Caity', lastName: 'Heath', awesome: true};
  response.json(caity);
});

app.get('/location', (request, response) => {
  // const locationData = searchToLatLong(request.query.data);
  console.log(request);
  console.log(request.query);
  console.log(request.query.data);
  response.send(locationData);
});

app.use('*', (req, res) => res.send('That route does not exist'));

//Turn the server on so it will listen for incoming requests
app.listen(PORT, () => console.log (`listening on PORT ${PORT}`));


//HELPER FUNCTIONS

// function searchToLatLong(
