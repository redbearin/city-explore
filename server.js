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


app.get('/location', (request, response) => {
  const locationData = searchToLatLong(request.query.data);
  response.json(locationData);
});

app.use('*', (req, res) => res.send('That route does not exist'));

//Turn the server on so it will listen for incoming requests
app.listen(PORT, () => console.log (`listening on PORT ${PORT}`));

//ERROR HANDLER
function handleError(error, response) {
  console.error(error);
  if(response) {
    response.status(500).send('Sorry, something went wrong!');
  }
}

//HELPER FUNCTIONS

function searchToLatLong(entry) {
  const geoData = require('./data/geo.json');
  const location = new Location(geoData);
  location.search_query = entry; // adding new property to location object, because we want the search term to be attached to its data
  return location;
}

function Location(data) {
  this.latitude = data.results[0].geometry.location.lat;
  this.longitude = data.results[0].geometry.location.lng;
  this.formatted_query = data.results[0].formatted_address;
}
