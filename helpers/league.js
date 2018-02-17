const request = require('request');
const config = require('../config.js');

var parseUser = function(user) {
  return user.replace(' ', '%20')
}

var getAccountId = function(user, callback) {
  // user = parseUser(user);
  request(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Lord%20Gregory?api_key=${config.API_KEY}`, function(err, res, body) {
      callback(JSON.parse(res.body).accountId);
  })
};

var getRecentMatches = function(accountId, callback) {
  request(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}/recent?api_key=${config.API_KEY}`, function(err, res, body) {
      console.log(body);
  })
}

// console.log(getRecentMatches('39348750'));
console.log(getAccountId('Lord Gregory', getRecentMatches));