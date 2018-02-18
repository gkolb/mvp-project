const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const league = require('../helpers/league.js')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../src/client'));

app.get('/matches', (req, res) => {
  league.getMatches('Lord Gregory')
    .then(function(data) {
      res.send(data);
    })
})
app.get('/matche', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))