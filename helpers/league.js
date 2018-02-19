const request = require('request');
var throttledRequest = require('throttled-request')(request);
const config = require('../config.js');
const db = require('../database/index.js');
var Promise = require("bluebird");
const _ = require('underscore');


throttledRequest.configure({
  requests: 1,
  milliseconds: 1201
});

var getAllMatches = function(index, userId){
  throttledRequest(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/39348750?beginIndex=${index}&api_key=${config.API_KEY}`, function(err, res, body) {
    var matches = JSON.parse(body).matches;
    if(matches.length > 0){
      console.log(matches.length)
      getAllMatches(index + 100, userId)
      db.save(matches, userId)
    }
    })
    // .on('response', function (a, b, c) {
    //   console.log('a', typeof a.body, 'b ', typeof b, 'c ', typeof c);
    // });
};

// getAllMatches(0, 'Lord Gregory');



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
    getAccountId(user)
      .then(getRecentMatches)
      .then(console.log)
      .then(resolve)
      .catch(reject);
  })

}

let getPlayedChampCount = function(user, callback) {
  db.findAllMatches(function(results) {
    var champObj = {};
    var champs = _.each(db.champions, (champ, id) => {
      champObj[id] = {
        champ: champ,
        count: 0
      };
    })
    _.each(results, (match) => {
      champObj[match.championId].count++;
    })
    callback(champObj)
    // console.log('matches', results)
  });
}

let getTop5Champs = function(user, callback) {
  getPlayedChampCount(user, function(champs) {
  var champArr = [];
  _.each(champs, function(champ) {
    champArr.push(champ);
  });
  var sortedChampArr = _.sortBy(champArr, function(champ) {
    return champ.count * -1;
  });
  callback([sortedChampArr[0], sortedChampArr[1], sortedChampArr[2], sortedChampArr[3], sortedChampArr[4]])
  });

}





// console.log(getRecentMatches('39348750'));
// console.log(getAccountId('Lord Gregory')
//   .then(getRecentMatches)
//   .then(db.save)
//   .then(console.log));
// console.log(getMatchesFromUsername('Lord Gregory').then(console.log))


module.exports.getMatches = getMatchesFromUsername;
module.exports.getTop5Champs = getTop5Champs

//accountId: 39348750

