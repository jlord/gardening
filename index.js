#!/usr/bin/env node

var request = require('request')
var cheerio =  require('cheerio')
var parseArgs = require('minimist')

var args = parseArgs(process.argv)
var username = args._[2]
var url = 'https://github.com/users/' + username + '/contributions'

if (args.y) {
  console.log("Get yesterday's")
  getDate()
} else getPage()

function getPage() {
  request(url, function (error, response, body) {
    if (error) return console.log(error, "Couldn't find page!")
    if (!error && response.statusCode == 200) getStats(body)
  })
}

function getStats(html) {
  $ = cheerio.load(html)
  var lastContribution = $('.day').last()
  console.log($('.day').last().attr('data-date'))
  var contributions = parseInt($('.day').last().attr('data-count'), 10)
  if (!contributions && contributions != 0) return getPage()

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
    var userFill = greens[fill]

    return console.log("---\n✔︎ Green " + userFill + '! ' + username +
      " has " + contributions + " today!\n---")
  }
}

function getDate() {
  var today = new Date()
  var yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  yesterday.toLocaleDateString('en-US')
  formatted = formatDate(yesterday)
  console.log(formatted)
}

function formatDate(date) {
  return date.getFullYear() + "-"
         + (date.getMonth() + 1) + "-"
         + date.getDate()
}
