const express = require('express');
const app = express();
const bearController = require('./bearController');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = 4000;


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });


//Record data in the sightings table.
app.post('/sighting', bearController.record);

//Retrieves data with conditions injested in query params.
app.get('/sighting/search', bearController.search);

//Retrieves a sight after its id.
app.get('/sighting/:id', bearController.searchId);

app.listen(PORT, () => {console.log('Listening on port '+ PORT)})

module.exports = app;