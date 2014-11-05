#!/usr/bin/env node

var request = require('request')
var cheerio =  require('cheerio')
var parseArgs = require('minimist')

var args = parseArgs(process.argv)
var username = args._[2]
var url = 'https://github.com/users/' + username + '/contributions'

if (args.y) {
  console.log("Get yesterday's")
  getByDate()
} else getPage()

// function getPage() {
//   request(url, function (error, response, body) {
//     if (error) return console.log(error, "Couldn't find page!")
//     if (!error && response.statusCode == 200) getStats(body)
//   })
// }

function getPage(date) {
  console.log("get page")
  var data = {}
  if (date) data.date = date

  request(url, function (error, response, body) {
    if (error) return console.log(error, "Couldn't find page!")
    if (!error && response.statusCode == 200) {
      data.html = body
      return getStats(data)
    }
  })
}

function getStats(data) {
  console.log("date")
  $ = cheerio.load(data.html)

  if (!data.date) {
    console.log("no date")
    var lastContribution = $('.day').last()
    var contributions = parseInt($('.day').last().attr('data-count'), 10)
  } else {
    contributionByDate(data.html, data.date)
  }

  // <rect class="day" width="11" height="11" y="65" fill="#eeeeee" data-count="0" data-date="2014-10-31"></rect>
  // var contributions = parseInt($('.day').last().attr('data-count'), 10)
  if (!contributions && contributions != 0) return getPage()
}

function contributionCounts(number) {
  console.log("count")
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

function contributionByDate(html, date) {
  $ = cheerio.load(html)

  var contributions = $('day')
  var match
  contributions.forEach(function findMatch(day) {
    if (dat.attr('data-date').match(date)) {
      match = day
      console.log(match)
    }
  })
  return match
}

function getByDate() {
  var today = new Date()
  var yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  yesterday.toLocaleDateString('en-US')
  formatted = formatDate(yesterday)
  console.log(formatted)
  getPage(formatted)
}

function formatDate(date) {
  return date.getFullYear() + "-"
         + (date.getMonth() + 1) + "-"
         + date.getDate()
}
