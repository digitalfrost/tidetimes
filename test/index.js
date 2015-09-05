var TideCrawler = require('../lib/index.js');



console.log("Test with time and location");
var tides4 = new TideCrawler("monday", "@scrabster");
console.log(tides4.uri);
console.log(tides4.getTimes());
