#!/usr/bin/env node
var TideCrawler = require('./lib/index.js');
var argv = require('yargs').argv;


if (argv.h || argv.help) {
  console.log("Get UK tide times on the command line\nUsage: tidetimes @falmouth \ntidetimes tomorrow @falmouth\ntidetimes saturday @cowes")
  process.exit(code=0);
}

var tides = new TideCrawler(argv);
console.log(tides.getTimes());
