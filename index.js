#!/usr/bin/env node

var request = require('request')
var cheerio =  require('cheerio')

var username = process.argv[2]
var url = 'https://github.com/users/' + username + '/contributions'

getPage()

function getPage() {
  request(url, function (error, response, body) {
    if (error) return console.log(error, "Couldn't find page!")
    if (!error && response.statusCode == 200) getStats(body)
  })
}

function getStats(html) {
  $ = cheerio.load(html)
  var lastContribution = $('.day').last()
  var contributions = parseInt($('.day').last().attr('data-count'), 10)
  console.log("contributions", contributions, $('.day').last().attr('data-count'))
  if (!contributions) return getPage()

  if (contributions === 0) {
    return console.log("---\n✗ Grey! " + username +
      " has " + contributions + " today!\n---")
  } else {

    var greens = {
      "#d6e685" : "Level 1",
      "#8cc665" : "Level 2",
      "#44a340" : "Level 3",
      "#1e6823" : "Level 4"
    }

    var fill = $('.day').last().attr('fill')
    console.log("fill", fill)
    var userFill = greens[fill]

    return console.log("---\n✔︎ Green " + userFill + '! ' + username +
      " has " + contributions + " today!\n---")
  }
}
