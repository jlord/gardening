#!/usr/bin/env node

var request = require('request')
var cheerio =  require('cheerio')

var username = process.argv[2]
var url = 'https://github.com/' + username

request(url, function (error, response, body) {
  if (error) return console.log(error, "Couldn't find page!")
  if (!error && response.statusCode == 200) getStats(body)
})

function getStats(html) {
  $ = cheerio.load(html)
  var contributions = parseInt($('.day').last().attr('data-count'), 10)

  if (contributions === 0) {
    return console.log("---\n✗ Grey! " + username + " has " + contributions + " today!\n---")
  } else {
    return console.log("---\n✔︎ Green! " + username + " has " + contributions + " today!\n---")
  }
}
