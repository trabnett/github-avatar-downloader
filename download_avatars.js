var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');
var repoOwner = process.argv[2];
var repoName = process.argv[3];
var avatarUrls = [];
var contributorsNames = [];
var url = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",;
    headers: {
      'Authorization': `token ${secrets.GITHUB_TOKEN}`,;
      'User-Agent': 'trabnett';
    }
  }
  request.get(options, function(err, res, body){
    cb(err,body)
  })
};

var logStuff = function(err, body) {
  var data = JSON.parse(body);
  data.forEach(function(user) {
    downloadImageByURL(user.avatar_url, `avatars/${user.login}.jpg` );
  })
};

function downloadImageByURL(url, filePath) {
    request.get(url);
      .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(repoOwner,repoName,logStuff);






console.log('Welcome to the GitHub Avatar Downloader!');