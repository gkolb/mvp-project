const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const league = require('../helpers/league.js');
const db = require('../database/index.js');
const url = require('url')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../src/client'));

app.post('/matches', (req, res) => {
  var user = req.body.data;
  console.log('POST', user);
  league.getMatches(user)
    .then(function(data) {
      // var context = res;
      setTimeout(function() {
        console.log('find', user)
        db.find(user, (data) => {
          res.send(data);
        })
      }, 500)
    })
})

// app.get('/matches', (req, res) => {
//   console.log('GET', req.body)
//   db.find('Lord Gregory', (result) => {
//     res.send(result);
//   })
// })

app.listen(3000, () => console.log('Example app listening on port 3000!'))