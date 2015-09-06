#!/usr/bin/env node
var TideCrawler = require('./lib/index.js');
var argv = require('yargs').argv;
var fs = require('fs');
var userHome = require('user-home');


if (argv.h || argv.help) {
  console.log("Get UK tide times on the command line\nUsage: tidetimes @falmouth \ntidetimes tomorrow @falmouth\ntidetimes saturday @cowes")
  process.exit(code=0);
}

//looks for file in ~/.tidetimes that sets a default location
function defaultLocation() {
    var location;
  try {
    location = fs.readFileSync(userHome + '/.tidetimes').toString().trim();
    return location;
  } catch (e) {
    if (e.code === 'ENOENT') {
      return 'falmouth'
    } else {
      throw e;
    }
  }
}

//set default location
if (argv._.length == 0) {
  argv._[0] = defaultLocation();
} else if (argv._.length == 1) {
  //is the argument a date
  if (['tomorrow', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].indexOf(argv._[0]) != -1) {
     argv._[1] = defaultLocation();
  }
}

var tides = new TideCrawler(argv);
console.log(tides.getTimes());
