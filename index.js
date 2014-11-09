#!/usr/bin/env node

var request = require('request')
var cheerio =  require('cheerio')
var parseArgs = require('minimist')

var args = parseArgs(process.argv)
var username = args._[2]
var url = 'https://github.com/users/' + username + '/contributions'

var data = {}

if (args.y) {
  data.date = yesterdaysDate()
  data.y = true
  getPage()
} else {
  data.date = formatDate(new Date())
  data.y = false
  getPage()
}

function getPage() {
  request(url, function (error, response, body) {
    if (error) return console.log(error, "Couldn't find page!")
    if (!error && response.statusCode == 200) {
      data.html = body
      return getStats()
    }
  })
}

function getStats() {
  $ = cheerio.load(data.html)
  var contributions = $('.day')

  contributions.each(function(i, day) {
    if ($(day).attr('data-date').match(data.date)) {
      data.fill = $(day).attr('fill')
      data.count = $(day).attr('data-count')
      return contributionCounts()
    } else if (i === contributions.length) {
      return console.log("No match for date", $(day).attr('data-date'))
    }
  })
}

function contributionCounts() {
  var day = data.y ? "yesterday" : "today"

  if (data.count === "0") {
    return console.log("---\n✗ Grey! " + username +
      " with " + data.count, day + "!\n---")
  } else {
    var greens = {
      "#d6e685" : "Level 1",
      "#8cc665" : "Level 2",
      "#44a340" : "Level 3",
      "#1e6823" : "Level 4"
    }
    var userFill = greens[data.fill] ? greens[data.fill] : 'unknown level'

    return console.log("---\n✔︎ Green " + userFill + '! ' + username +
      " with " + data.count, day + "!\n---")
  }
}

function yesterdaysDate() {
  var today = new Date()
  var yester = new Date(today)
  yester.setDate(today.getDate() - 1)
  return formatDate(yester)
}

function formatDate(date) {
  return date.toISOString().split("T")[0]
}
