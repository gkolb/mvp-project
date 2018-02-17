const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/league');
const _ = require('underscore');
var Promise = require('bluebird');


let matchSchema = mongoose.Schema({
  matchId: { type: Number, unique: true },
  summoner: String,
  champion: String,
  lane: String
})

let Match = mongoose.model('Match', matchSchema);

let save = (matches, user) => {
  _.each(matches, (match) => {
    var currentMatch = new Match({
      matchId: match.gameId,
      summoner: user,
      champion: 'champ',
      lane: match.lane
    })
    currentMatch.save(function(err, data) {
      if (err) {
        console.log('error saving')
      } else {
        console.log('saved')
      }

    })
  });
}

module.exports.save = save;