#!/usr/bin/env node
var Crawler = require("crawler").Crawler;
var moment = require('moment');
var argv = require('yargs').argv;

if (argv.h || argv.help) {
  console.log("Get UK tide times on the command line\nUsage: tidetimes @falmouth \ntidetimes tomorrow @falmouth\ntidetimes saturday @cowes")
  process.exit(code=0);
}

// Default location
// TODO specify this in a config file
var location = 'falmouth';
var date = '';

// Vaid Date arguments
var dateArgs = ['tomorrow', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// if the location argument starts with @ remove it
var formatLocation = function(location) {
  if (location[0] === '@') {
    return location.substring(1)
  } else {
    return location
  }
}

if (argv._.length == 1) {
  // is the argument a date or a location?
  var index = dateArgs.indexOf(argv._[0])
  if (index > -1 ){
    if (index == 0) {
      date = moment().add('days', 1).format('-YYYYMMDD')
    } else {
      date = moment().day(index).format('-YYYYMMDD')
    }
  } else {
    location = formatLocation(argv._[0])
  }
} else if (argv._.length == 2) {
  // two arguments provided
  // first argument should be date related
  // second argument shoudl be a location
  var index = dateArgs.indexOf(argv._[0])
  if (index == 0) {
    date = moment().add('days', 1).format('-YYYYMMDD')
  } else {
    date = moment().day(index).format('-YYYYMMDD')
  }
  location = formatLocation(argv._[1])
}

// the uri of page where we will scrape the data
var uri = 'http://www.tidetimes.co.uk/'+location+'-tide-times'+date

// Format the scaped tide times by removing extra spaces, adding a line break after m, and removing the leading spaces
formatTideTimes = function(times) {
  return times.replace(/\s+/g, " ").replace(/m /g, "m\n").substring(1)
}

// Scrape the data

var c = new Crawler({
"maxConnections":1,

"callback":function(error,result,$) {
    
    if(!error && result.statusCode === 200){
      var times = $(".times").text();
      console.log(formatTideTimes(times));
    }else{
      console.log('No data available for this location')
    }
    process.exit(code=0);
}
});

c.queue(uri);
