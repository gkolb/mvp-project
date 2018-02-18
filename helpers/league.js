const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');
var Promise = require("bluebird");



var parseUser = function(user) {
  return user.replace(' ', '%20')
}

var getAccountId = function(user) {

  var parsedUser = parseUser(user);
  return new Promise(function(resolve, reject) {
      request(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${parsedUser}?api_key=${config.API_KEY}`, function(err, res, body) {
        if (err) {
          reject(err);
        } else {
          console.log(JSON.parse(res.body).accountId)
          resolve([JSON.parse(res.body).accountId, user]);
        }
      // getRecentMatches(JSON.parse(res.body).accountId, user, callback);
      });
  })
};

var getRecentMatches = function(arr) {
  var user = arr[1];
  var accountId = arr[0];
  return new Promise(function(resolve, reject) {
    request(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}/recent?api_key=${config.API_KEY}`, function(err, res, body) {
        if (err) {
          reject(err)
        } else {
          var matches = JSON.parse(body).matches
          db.save(matches, user)
          resolve(JSON.stringify(matches))
        }

        // db.save(matches, user);
        // callback(matches);
    });
  })
}

var getMatchesFromUsername = function(user) {
  return new Promise(function(resolve, reject) {
  getAccountId('Lord Gregory')
    .then(getRecentMatches)
    .then(console.log)
    .then(resolve)
    .catch(reject);
  })

}

// console.log(getRecentMatches('39348750'));
// console.log(getAccountId('Lord Gregory')
//   .then(getRecentMatches)
//   .then(db.save)
//   .then(console.log));
// console.log(getMatchesFromUsername('Lord Gregory').then(console.log))


module.exports.getMatches = getMatchesFromUsername;

