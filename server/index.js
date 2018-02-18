const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const league = require('../helpers/league.js');
const db = require('../database/index.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../src/client'));

app.post('/matches', (req, res) => {
  league.getMatches('Lord Gregory')
    .then(function(data) {
      res.send('saved to db');
    })
})

app.get('/matches', (req, res) => {
  db.find('Lord Gregory', (result) => {
    res.send(result);
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))